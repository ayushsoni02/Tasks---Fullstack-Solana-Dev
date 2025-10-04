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


const PROGRAM_ID = new PublicKey('Q5v9W72xJaP3J39EnwhPm6LBgmUPTEkSQwtqgLFQaLw');

const WALLET_KEYPAIR_PATH = process.env.WALLET_PATH || './keypair.json';


const TOKEN_MINT_ADDRESS = process.env.TOKEN_MINT || null;


const DEPOSIT_AMOUNT = 1_000_000; 


const RPC_ENDPOINT = 'https://api.devnet.solana.com';


function loadOrCreateWallet(): Keypair {
  try {
    const keypairData = JSON.parse(fs.readFileSync(WALLET_KEYPAIR_PATH, 'utf-8'));
    const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    return keypair;
  } catch (error) {
    console.log('Keypair not found, generating new one...');
    const newKeypair = Keypair.generate();
    fs.writeFileSync(
      WALLET_KEYPAIR_PATH,
      JSON.stringify(Array.from(newKeypair.secretKey))
    );
    console.log('New keypair saved to:', WALLET_KEYPAIR_PATH);
    return newKeypair;
  }
}


function getVaultPDA(authorityPubkey: PublicKey): [PublicKey, number] {
  const [pda, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), authorityPubkey.toBuffer()],
    PROGRAM_ID
  );
  return [pda, bump];
}


function createDepositInstructionData(amount: number): Buffer {
  const data = Buffer.alloc(9);
  data.writeUInt8(0, 0); // Discriminator for Deposit
  data.writeBigUInt64LE(BigInt(amount), 1); // Amount as u64
  return data;
}


async function ensureSufficientBalance(
  connection: Connection,
  publicKey: PublicKey,
  minBalance: number = 0.5
): Promise<void> {
  const balance = await connection.getBalance(publicKey);
  const balanceInSol = balance / 1e9;

  console.log(`Current balance: ${balanceInSol.toFixed(4)} SOL`);

  if (balanceInSol < minBalance) {
    console.log('Requesting airdrop...');
    try {
      const signature = await connection.requestAirdrop(
        publicKey,
        2 * 1e9 // 2 SOL
      );
      await connection.confirmTransaction(signature);
      console.log('Airdrop successful!');
    } catch (error) {
      console.log('Airdrop failed. You may need to request manually:');
      console.log(`solana airdrop 2 ${publicKey.toBase58()} --url devnet`);
    }
  }
}


 // Create a test token mint and mint tokens to user

async function createTestToken(
  connection: Connection,
  payer: Keypair
): Promise<PublicKey> {
  console.log('\n Creating test token mint...');
  
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    null,
    6 // 6 decimals (like USDC)
  );
  
  console.log('Token Mint created:', mint.toBase58());
  
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
  
  console.log('Minted 10 tokens to user account');
  
  return mint;
}


async function executeDeposit() {
  console.log('Escrow Deposit Script - Task 1\n');

 
  const connection = new Connection(RPC_ENDPOINT, 'confirmed');
  const wallet = loadOrCreateWallet();
  
  console.log('Wallet Public Key:', wallet.publicKey.toBase58());
  console.log('Network: Devnet');
  console.log('Program ID:', PROGRAM_ID.toBase58());

 
  await ensureSufficientBalance(connection, wallet.publicKey);

 
  let tokenMint: PublicKey;
  
  if (TOKEN_MINT_ADDRESS) {
    tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
    console.log('\n Using provided token mint:', tokenMint.toBase58());
  } else {
   
    tokenMint = await createTestToken(connection, wallet);
  }

 
  console.log('\n Setting up token accounts...');
  const userTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    tokenMint,
    wallet.publicKey
  );
  console.log('User Token Account:', userTokenAccount.address.toBase58());

  const tokenBalance = await connection.getTokenAccountBalance(
    userTokenAccount.address
  );
  console.log(`Balance: ${tokenBalance.value.uiAmount} tokens`);

  
  const [vaultPDA, vaultBump] = getVaultPDA(wallet.publicKey);
  console.log('\n Vault PDA:', vaultPDA.toBase58());
  console.log('Bump:', vaultBump);

 
  const vaultTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    vaultPDA,
    true // allowOwnerOffCurve - PDA can own token accounts
  );
  console.log('Vault Token Account:', vaultTokenAccount.toBase58());

  const vaultTokenAccountInfo = await connection.getAccountInfo(vaultTokenAccount);
  
  if (!vaultTokenAccountInfo) {
    console.log('Vault token account does not exist');
    console.log('Creating vault token account...');
    
    
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
    console.log('Vault token account created:', createATASig);
  }


  console.log('\n Preparing deposit instruction...');
  console.log('Amount:', DEPOSIT_AMOUNT, '(raw units)');
  
  const instructionData = createDepositInstructionData(DEPOSIT_AMOUNT);

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

  console.log('\n Sending transaction...');
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

    console.log('\n Transaction successful!\n');

    console.log('Signature:', signature);
    console.log('Explorer:', `https://explorer.solana.com/tx/${signature}?cluster=devnet\n`);


    console.log('\n Verifying deposit...');
    const newVaultBalance = await connection.getTokenAccountBalance(vaultTokenAccount);
    console.log('Vault Token Balance:', newVaultBalance.value.uiAmount, 'tokens');

  } catch (error: any) {
    console.error('\n Transaction failed!');

    
    if (error.logs) {
      console.error('Program Logs:');
      error.logs.forEach((log: string) => console.error('   ', log));
    }
    
    console.error('\n Error:', error.message);
    throw error;
  }
}


executeDeposit()
  .then(() => {
    console.log('\n Script completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n Script failed:', error.message);
    process.exit(1);
  });
