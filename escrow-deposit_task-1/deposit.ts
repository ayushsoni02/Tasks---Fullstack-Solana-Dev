import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  createMint,
  mintTo,
} from '@solana/spl-token';
import * as fs from 'fs';


// ============================================
// CONFIGURATION
// ============================================

// Escrow Program ID deployed on Devnet
const PROGRAM_ID = new PublicKey('Q5v9W72xJaP3J39EnwhPm6LBgmUPTEkSQwtqgLFQaLw');

// Your wallet keypair path
// Default Solana CLI path: ~/.config/solana/id.json
// Or create a new keypair for testing
const WALLET_KEYPAIR_PATH = process.env.WALLET_PATH || './keypair.json';

// SPL Token mint address to deposit
// You can use any SPL token on devnet, or we'll create one for testing
const TOKEN_MINT_ADDRESS = process.env.TOKEN_MINT || null;

// Amount to deposit (in token's smallest unit)
// For a token with 6 decimals, 1000000 = 1 token
const DEPOSIT_AMOUNT = 1_000_000; // 1 token (assuming 6 decimals)

// Devnet RPC endpoint
const RPC_ENDPOINT = 'https://api.devnet.solana.com';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Load wallet keypair from file
 * If file doesn't exist, creates a new keypair
 */
function loadOrCreateWallet(): Keypair {
  try {
    const keypairData = JSON.parse(fs.readFileSync(WALLET_KEYPAIR_PATH, 'utf-8'));
    const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    return keypair;
  } catch (error) {
    console.log('⚠️  Keypair not found, generating new one...');
    const newKeypair = Keypair.generate();
    fs.writeFileSync(
      WALLET_KEYPAIR_PATH,
      JSON.stringify(Array.from(newKeypair.secretKey))
    );
    console.log('✅ New keypair saved to:', WALLET_KEYPAIR_PATH);
    return newKeypair;
  }
}

/**
 * Derive vault PDA from authority pubkey
 * Seeds: ["vault", authority_pubkey]
 */
function getVaultPDA(authorityPubkey: PublicKey): [PublicKey, number] {
  const [pda, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), authorityPubkey.toBuffer()],
    PROGRAM_ID
  );
  return [pda, bump];
}

/**
 * Create instruction data for deposit
 * Format: [discriminator: u8, amount: u64]
 */
function createDepositInstructionData(amount: number): Buffer {
  const data = Buffer.alloc(9);
  data.writeUInt8(0, 0); // Discriminator for Deposit
  data.writeBigUInt64LE(BigInt(amount), 1); // Amount as u64
  return data;
}

/**
 * Request airdrop if balance is low
 */
async function ensureSufficientBalance(
  connection: Connection,
  publicKey: PublicKey,
  minBalance: number = 0.5
): Promise<void> {
  const balance = await connection.getBalance(publicKey);
  const balanceInSol = balance / 1e9;

  console.log(`💰 Current balance: ${balanceInSol.toFixed(4)} SOL`);

  if (balanceInSol < minBalance) {
    console.log('🪂 Requesting airdrop...');
    try {
      const signature = await connection.requestAirdrop(
        publicKey,
        2 * 1e9 // 2 SOL
      );
      await connection.confirmTransaction(signature);
      console.log('✅ Airdrop successful!');
    } catch (error) {
      console.log('⚠️  Airdrop failed. You may need to request manually:');
      console.log(`   solana airdrop 2 ${publicKey.toBase58()} --url devnet`);
    }
  }
}

/**
 * Create a test token mint and mint tokens to user
 * ASSUMPTION: For testing purposes, we create a new token mint
 * In production, you would use an existing token
 */
async function createTestToken(
  connection: Connection,
  payer: Keypair
): Promise<PublicKey> {
  console.log('\n🪙 Creating test token mint...');
  
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6 // 6 decimals (like USDC)
  );
  
  console.log('✅ Token Mint created:', mint.toBase58());
  
  // Get or create token account for user
  const userTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );
  
  // Mint some tokens to user
  await mintTo(
    connection,
    payer,
    mint,
    userTokenAccount.address,
    payer,
    10_000_000 // 10 tokens
  );
  
  console.log('✅ Minted 10 tokens to user account');
  
  return mint;
}

// ============================================
// MAIN EXECUTION
// ============================================

async function executeDeposit() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   Escrow Deposit Script - Task 1      ║');
  console.log('╚════════════════════════════════════════╝\n');

  // 1. Setup connection and wallet
  const connection = new Connection(RPC_ENDPOINT, 'confirmed');
  const wallet = loadOrCreateWallet();
  
  console.log('📍 Wallet Public Key:', wallet.publicKey.toBase58());
  console.log('🌐 Network: Devnet');
  console.log('📦 Program ID:', PROGRAM_ID.toBase58());

  // 2. Ensure sufficient SOL balance
  await ensureSufficientBalance(connection, wallet.publicKey);

  // 3. Get or create token mint
  let tokenMint: PublicKey;
  
  if (TOKEN_MINT_ADDRESS) {
    tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
    console.log('\n🪙 Using provided token mint:', tokenMint.toBase58());
  } else {
    // ASSUMPTION: Creating a test token for demonstration
    // In production, use an existing SPL token
    tokenMint = await createTestToken(connection, wallet);
  }

  // 4. Get user's token account
  console.log('\n📦 Setting up token accounts...');
  const userTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    tokenMint,
    wallet.publicKey
  );
  console.log('✅ User Token Account:', userTokenAccount.address.toBase58());

  const tokenBalance = await connection.getTokenAccountBalance(
    userTokenAccount.address
  );
  console.log(`   Balance: ${tokenBalance.value.uiAmount} tokens`);

  // 5. Derive vault PDA
  const [vaultPDA, vaultBump] = getVaultPDA(wallet.publicKey);
  console.log('\n🔐 Vault PDA:', vaultPDA.toBase58());
  console.log('   Bump:', vaultBump);

  // 6. Get vault token account (ATA owned by the vault PDA)
  const vaultTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    vaultPDA,
    true // allowOwnerOffCurve - PDA can own token accounts
  );
  console.log('✅ Vault Token Account:', vaultTokenAccount.toBase58());

  // 7. Check if vault token account exists, create if needed
  const vaultTokenAccountInfo = await connection.getAccountInfo(vaultTokenAccount);
  
  if (!vaultTokenAccountInfo) {
    console.log('⚠️  Vault token account does not exist');
    console.log('   Creating vault token account...');
    
    // We need to create the ATA for the vault
    const { createAssociatedTokenAccountInstruction } = await import('@solana/spl-token');
    const createATAIx = createAssociatedTokenAccountInstruction(
      wallet.publicKey, // payer
      vaultTokenAccount, // ata
      vaultPDA, // owner (the vault PDA)
      tokenMint // mint
    );

    const createATATx = new Transaction().add(createATAIx);
    const createATASig = await sendAndConfirmTransaction(
      connection,
      createATATx,
      [wallet]
    );
    console.log('✅ Vault token account created:', createATASig);
  }

  // 8. Create deposit instruction
  console.log('\n📝 Preparing deposit instruction...');
  console.log('   Amount:', DEPOSIT_AMOUNT, '(raw units)');
  
  const instructionData = createDepositInstructionData(DEPOSIT_AMOUNT);

  /**
   * Account layout from deposit.rs:
   * 0. sender_account (writable) - User's token account
   * 1. recipient_account (writable) - Vault's token account  
   * 2. authority_account (signer) - User's wallet
   * 3. token_program - SPL Token Program
   */
  const depositInstruction = new TransactionInstruction({
    keys: [
      { pubkey: userTokenAccount.address, isSigner: false, isWritable: true },
      { pubkey: vaultTokenAccount, isSigner: false, isWritable: true },
      { pubkey: wallet.publicKey, isSigner: true, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data: instructionData,
  });

  // 9. Send transaction
  console.log('\n📤 Sending transaction...');
  const transaction = new Transaction().add(depositInstruction);

  try {
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [wallet],
      {
        commitment: 'confirmed',
        skipPreflight: false,
      }
    );

    console.log('\n✅ Transaction successful!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Signature:', signature);
    console.log('🔗 Explorer:', `https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // 10. Verify deposit
    console.log('\n🔍 Verifying deposit...');
    const newVaultBalance = await connection.getTokenAccountBalance(vaultTokenAccount);
    console.log('✅ Vault Token Balance:', newVaultBalance.value.uiAmount, 'tokens');

  } catch (error: any) {
    console.error('\n❌ Transaction failed!');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (error.logs) {
      console.error('📋 Program Logs:');
      error.logs.forEach((log: string) => console.error('   ', log));
    }
    
    console.error('\n💡 Error:', error.message);
    throw error;
  }
}

// ============================================
// RUN SCRIPT
// ============================================

executeDeposit()
  .then(() => {
    console.log('\n✨ Script completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error.message);
    process.exit(1);
  });

/**
 * ============================================
 * ASSUMPTIONS MADE:
 * ============================================
 * 
 * 1. INSTRUCTION FORMAT:
 *    - Discriminator is 1 byte (u8) with value 0 for deposit
 *    - Amount is 8 bytes (u64) in little-endian format
 * 
 * 2. ACCOUNT ORDERING:
 *    Based on deposit.rs, accounts are in this exact order:
 *    - sender_account (user's token account)
 *    - recipient_account (vault's token account)
 *    - authority_account (user's wallet, must sign)
 *    - token_program (SPL Token Program ID)
 * 
 * 3. VAULT TOKEN ACCOUNT:
 *    - The vault's token account must be an Associated Token Account (ATA)
 *    - It's owned by the vault PDA
 *    - Must be created before first deposit
 * 
 * 4. TOKEN MINT:
 *    - If no token mint is provided, script creates a test token
 *    - Production usage should specify existing token via TOKEN_MINT env var
 * 
 * 5. NETWORK:
 *    - Script runs on Devnet by default
 *    - Program is deployed at Q5v9W72xJaP3J39EnwhPm6LBgmUPTEkSQwtqgLFQaLw
 * 
 * 6. WALLET:
 *    - Script loads from ./keypair.json or creates new one
 *    - Override with WALLET_PATH environment variable
 *    - Automatically requests airdrop if balance is low
 */