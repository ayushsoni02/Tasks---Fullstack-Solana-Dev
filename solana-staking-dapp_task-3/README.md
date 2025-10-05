# Solana Token Staking DApp

A modern, user-friendly decentralized application (DApp) for staking SPL tokens on the Solana blockchain. Built with Next.js, TypeScript, and Anchor framework.

## Features

- **Wallet Integration** - Connect with popular Solana wallets (Phantom, Solflare, etc.)
- **Token Staking** - Stake SPL tokens with customizable lock durations
- **Real-time Updates** - View your active stake accounts with live data
- **Responsive UI** - Beautiful, modern interface built with TailwindCSS
- **Type-safe** - Full TypeScript support for better developer experience
- **Devnet Ready** - Configured for Solana Devnet testing

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS
- **Blockchain**: Solana Web3.js, Anchor Framework
- **Wallet Adapter**: @solana/wallet-adapter-react

## Prerequisites

- Node.js 18+ installed
- A Solana wallet (Phantom, Solflare, etc.)
- SOL tokens on Devnet for transaction fees
- Test tokens from the configured token mint

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd solana-staking-dapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment (optional)

The app is pre-configured with the following:
- **Network**: Solana Devnet
- **Program ID**: `Hv6Q2KdFtbdobWYEeMWJ2yPfmg6efMZPd3A6mfKN3L7W`
- **Token Mint**: `Cx97mtHU9hKb3XWeKcDPHgLyEB8vguoNxEsnyGUmm4G9`

To use different values, update `/lib/constants.ts`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### Staking Tokens

1. **Connect Wallet** - Click "Select Wallet" and connect your Solana wallet
2. **Get Test Tokens** - Ensure you have tokens from the configured mint address
3. **Enter Amount** - Input the amount of tokens you want to stake
4. **Select Duration** - Choose a lock duration (Duration One, Two, or Three)
5. **Stake** - Click "Stake Tokens" and approve the transaction

### Viewing Stake Accounts

- Your active stake accounts appear automatically on the right side
- Each account shows:
  - Stake ID
  - Staked amount
  - Lock duration
  - Stake date
  - Claimed and burned amounts
- Click "Refresh" to update the list

## Project Structure

```
solana-staking-dapp/
├── app/
│   ├── layout.tsx          # Root layout with wallet provider
│   ├── page.tsx            # Main staking page
│   └── globals.css         # Global styles
├── components/
│   ├── WalletButton.tsx    # Wallet connection button
│   ├── WalletContextProvider.tsx  # Wallet adapter setup
│   ├── StakingForm.tsx     # Token staking form
│   └── StakeAccountsList.tsx      # Display user's stakes
├── lib/
│   ├── constants.ts        # Program IDs and configuration
│   └── idl.ts             # Anchor program IDL
└── public/                # Static assets
```

## Key Components

### WalletContextProvider
Configures Solana wallet adapter with support for multiple wallets and Devnet connection.

### StakingForm
Handles the staking flow:
- Amount validation
- Associated token account creation
- Balance checking
- Transaction submission

### StakeAccountsList
Fetches and displays user's stake accounts using Anchor's account filtering.

## Configuration

Edit `/lib/constants.ts` to customize:

```typescript
export const PROGRAM_ID = new PublicKey("YOUR_PROGRAM_ID");
export const TOKEN_MINT = new PublicKey("YOUR_TOKEN_MINT");
export const RPC_ENDPOINT = "YOUR_RPC_ENDPOINT";
export const TOKEN_DECIMALS = 9; // Adjust based on your token
```

## Testing

### Getting Test Tokens

Since the configured token mint has no mint authority, you'll need to:
1. Contact the program admin to receive test tokens, OR
2. Deploy your own instance of the staking program with a new token mint

### Testing Checklist

- [ ] Wallet connects successfully
- [ ] Associated token account is created if needed
- [ ] Balance check prevents over-staking
- [ ] Staking transaction completes
- [ ] Stake accounts display correctly
- [ ] Refresh updates the list

## Common Issues

### "Insufficient balance" error
- Ensure you have tokens in your wallet from the configured mint address

### "Account not initialized" error
- The app automatically creates your associated token account on first stake

### "InvalidAmount" error
- Check that you have sufficient token balance
- Verify the amount is greater than 0

## Program Information

- **Program ID**: `Hv6Q2KdFtbdobWYEeMWJ2yPfmg6efMZPd3A6mfKN3L7W`
- **Token Mint**: `Cx97mtHU9hKb3XWeKcDPHgLyEB8vguoNxEsnyGUmm4G9`
- **Network**: Devnet
- **Program Authority**: `BjjFpCbTrFVn3ZgcdCv4jTLAzbbDCMV1Vo115XJSJ7XG`

##  Build for Production

```bash
npm run build
npm start
```

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  License

This project is open source and available under the MIT License.

##  Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
