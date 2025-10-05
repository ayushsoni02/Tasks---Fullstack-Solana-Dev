# Solana Escrow Deposit Script

A TypeScript-based client script for depositing SPL tokens into a Solana escrow program on Devnet.

##  Overview

This project implements a deposit functionality for a Solana escrow smart contract. It allows users to deposit SPL tokens into a Program Derived Address (PDA) vault controlled by the escrow program.

##  Key Features

- **Automatic Wallet Management**: Loads existing wallet or generates a new keypair
- **Test Token Creation**: Automatically creates a test SPL token mint if none is provided
- **PDA Vault Management**: Derives and manages vault PDAs for token storage
- **Automatic Token Account Creation**: Creates associated token accounts as needed
- **Balance Verification**: Checks and requests SOL airdrops on Devnet when needed
- **Transaction Confirmation**: Provides detailed transaction logs and Solana Explorer links

##  Architecture

### Program Details
- **Program ID**: `Q5v9W72xJaP3J39EnwhPm6LBgmUPTEkSQwtqgLFQaLw`
- **Network**: Solana Devnet
- **RPC Endpoint**: `https://api.devnet.solana.com`

### PDA Derivation
The vault PDA is derived using:
```
seeds = ["vault", authority_pubkey]
program_id = Q5v9W72xJaP3J39EnwhPm6LBgmUPTEkSQwtqgLFQaLw
```

### Instruction Format
The deposit instruction uses the following data structure:
- **Byte 0**: Discriminator (`0` for Deposit)
- **Bytes 1-8**: Amount as u64 (little-endian)

### Account Structure
The deposit instruction requires these accounts in order:
1. **User Token Account** (writable) - Source of tokens
2. **Vault Token Account** (writable) - Destination PDA token account
3. **Authority** (signer) - User's wallet public key
4. **Token Program** - SPL Token Program ID

##  Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Solana CLI (optional, for manual airdrops)

### Setup
```bash
# Install dependencies
npm install

# Or using yarn
yarn install
```

##  Usage

### Basic Usage
```bash
npm run deposit
```

### Environment Variables
You can customize the script behavior using environment variables:

```bash
# Use a specific wallet keypair
WALLET_PATH=./my-wallet.json npm run deposit

# Use an existing token mint
TOKEN_MINT=<your-token-mint-address> npm run deposit
```

### Configuration
Edit these constants in `deposit.ts` to customize:

```typescript
const DEPOSIT_AMOUNT = 1_000_000;  // Amount in raw token units (1 token with 6 decimals)
const RPC_ENDPOINT = 'https://api.devnet.solana.com';
const PROGRAM_ID = new PublicKey('Q5v9W72xJaP3J39EnwhPm6LBgmUPTEkSQwtqgLFQaLw');
```

##  Workflow

1. **Wallet Loading**: Loads or creates a keypair from `keypair.json`
2. **Balance Check**: Ensures sufficient SOL balance (requests airdrop if needed)
3. **Token Setup**: Creates test token or uses provided mint address
5. **Deposit Execution**: Transfers tokens to the vault PDA
6. **Verification**: Confirms transaction and displays vault balance

##  Recent Transaction Example

### Latest Successful Transaction

**Transaction Signature**: `3hhaKHZsAKK3FHNXSfy7MGtPLsFSgQg61yfYrNmjb1QV74KTYHaG58Z5jm7SfKNqRW6etLP2oHc1q7wLu2gB5dYE`

**Solana Explorer**: [View Transaction](https://explorer.solana.com/tx/3hhaKHZsAKK3FHNXSfy7MGtPLsFSgQg61yfYrNmjb1QV74KTYHaG58Z5jm7SfKNqRW6etLP2oHc1q7wLu2gB5dYE?cluster=devnet)

**Transaction Details**:
- **Wallet**: `9YuVy3jkSSdLLzhnBJ8jVx3y6A4iroMmV8sx5XTT41nc`
- **Token Mint**: `8a6cMxoEvneckYMXpdP1sUkrkWGPMosk66tDJp6F7t8`
- **User Token Account**: `5zqdsTfR9xLdPfQAP4PvCAqywkqKoPv9H34cnyuNtwhf`
- **Vault PDA**: `D5gApsmtV99n6sfCYTWFyVRXiwBCAAB42RYkGqroheiX`
- **Vault Token Account**: `DCd4aXRy9Fi3QYayX4nRyq9w6ZTYPDXxgU2tK3yuRznD`
- **Amount Deposited**: 1 token (1,000,000 raw units)
- **Final Vault Balance**: 1 token

### Sample Output

After a successful deposit, you'll see output like:

```
 Transaction successful!

Signature: 3hhaKHZsAKK3FHNXSfy7MGtPLsFSgQg61yfYrNmjb1QV74KTYHaG58Z5jm7SfKNqRW6etLP2oHc1q7wLu2gB5dYE
Explorer: https://explorer.solana.com/tx/3hhaKHZsAKK3FHNXSfy7MGtPLsFSgQg61yfYrNmjb1QV74KTYHaG58Z5jm7SfKNqRW6etLP2oHc1q7wLu2gB5dYE?cluster=devnet

 Verifying deposit...
Vault Token Balance: 1 tokens
```

##  Technical Details

### Dependencies
- **@solana/spl-token** (^0.4.9) - SPL Token utilities
- **typescript** (^5.7.2) - TypeScript compiler
- **ts-node** (^10.9.2) - TypeScript execution engine

### Token Specifications
- **Decimals**: 6 (similar to USDC)
- **Initial Mint**: 10 tokens (10,000,000 raw units)
- **Deposit Amount**: 1 token (1,000,000 raw units)

### Error Handling
The script includes comprehensive error handling:
- Airdrop failures with manual instructions
- Token account creation verification
- Transaction logs on failure
- Detailed error messages

##  Security Notes

- **Keypair Storage**: The wallet keypair is stored in `keypair.json` - keep this file secure
- **Devnet Only**: This script is configured for Devnet - do not use on Mainnet without modifications
- **Test Tokens**: Automatically created tokens have no real value

##  File Structure

```
escrow-deposit_task-1/
├── deposit.ts           # Main deposit script
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── keypair.json         # Wallet keypair (auto-generated)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

##  Troubleshooting

### Airdrop Failures
If automatic airdrops fail, manually request SOL:
```bash
solana airdrop 2 <your-wallet-address> --url devnet
```

### Insufficient Token Balance
If you don't have enough tokens:
- The script automatically creates and mints test tokens
- Or provide your own token mint via `TOKEN_MINT` environment variable

### Transaction Failures
Check the program logs in the console output for detailed error messages from the Solana program.

##  License

MIT

##  Contributing

This is a task-specific implementation. For improvements or issues, please contact the project maintainer.

---

**Note**: This script is designed for educational and testing purposes on Solana Devnet. Always test thoroughly before adapting for production use.
