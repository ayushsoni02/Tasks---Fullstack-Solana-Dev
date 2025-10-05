# Fullstack Solana Developer - Tasks

This repository contains three comprehensive tasks demonstrating full-stack development skills in the Solana blockchain ecosystem, including smart contract interactions, modern web development, and decentralized application (DApp) creation.

##  Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Tasks Summary](#tasks-summary)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)

---

##  Overview

This repository showcases three distinct projects built as part of a Fullstack Solana Developer internship assignment:

1. **Escrow Deposit Script** - Solana blockchain interaction with SPL tokens
2. **xCombinator Website** - Modern responsive web application
3. **Solana Staking DApp** - Full-stack decentralized staking application

Each task demonstrates different aspects of blockchain development, from low-level Solana program interactions to high-level user interfaces.

---

##  Project Structure

```
intern-task/
│
├── escrow-deposit_task-1/          # Task 1: Solana Escrow Deposit Script
│   ├── deposit.ts                  # Main deposit script with PDA vault logic
│   ├── package.json                # Node.js dependencies
│   ├── tsconfig.json               # TypeScript configuration
│   ├── keypair.json                # Wallet keypair (auto-generated)
│   └── README.md                   # Detailed task documentation
│
├── xcombinator-website_task-2/     # Task 2: xCombinator Website
│   ├── app/                        # Next.js app directory
│   │   ├── ambassadors/            # Ambassadors page route
│   │   ├── contact/                # Contact page route
│   │   ├── products/               # Products showcase route
│   │   ├── sx/                     # $X token page route
│   │   ├── layout.tsx              # Root layout component
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles and animations
│   ├── components/                 # Reusable React components
│   │   ├── Navbar.tsx              # Navigation bar with mobile menu
│   │   └── Footer.tsx              # Footer with social links
│   ├── public/                     # Static assets (images, SVGs)
│   ├── next.config.ts              # Next.js configuration
│   ├── tailwind.config.ts          # TailwindCSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── package.json                # Dependencies and scripts
│   └── README.md                   # Detailed task documentation
│
├── solana-staking-dapp_task-3/     # Task 3: Solana Token Staking DApp
│   ├── app/                        # Next.js app directory
│   │   ├── layout.tsx              # Root layout with wallet provider
│   │   ├── page.tsx                # Main staking interface
│   │   ├── globals.css             # Global styles
│   │   └── favicon.ico             # App icon
│   ├── components/                 # React components
│   │   ├── WalletButton.tsx        # Wallet connection button
│   │   ├── WalletContextProvider.tsx  # Solana wallet adapter setup
│   │   ├── StakingForm.tsx         # Token staking form with validation
│   │   └── StakeAccountsList.tsx   # Display user's stake accounts
│   ├── lib/                        # Utility libraries
│   │   ├── constants.ts            # Program IDs and configuration
│   │   └── idl.ts                  # Anchor program IDL definition
│   ├── public/                     # Static assets
│   ├── next.config.ts              # Next.js configuration
│   ├── tailwind.config.js          # TailwindCSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── package.json                # Dependencies and scripts
│   └── README.md                   # Detailed task documentation
│
└── README.md                       # This file - Overall project documentation
```

---

##  Tasks Summary

### Task 1: Escrow Deposit Script
**Directory:** `escrow-deposit_task-1/`

A TypeScript-based command-line script for depositing SPL tokens into a Solana escrow program on Devnet.

**Key Features:**
- Automatic wallet management (loads or generates keypair)
- Test token creation and minting
- PDA (Program Derived Address) vault derivation
- Associated token account creation
- Balance verification and SOL airdrops
- Transaction confirmation with Explorer links

**Technologies:**
- TypeScript
- @solana/web3.js
- @solana/spl-token
- Node.js

**Quick Start:**
```bash
cd escrow-deposit_task-1
npm install
npm run deposit
```

**Program Details:**
- Program ID: `Q5v9W72xJaP3J39EnwhPm6LBgmUPTEkSQwtqgLFQaLw`
- Network: Solana Devnet
- PDA Seeds: `["vault", authority_pubkey]`

---

### Task 2: xCombinator Website
**Directory:** `xcombinator-website_task-2/`

A modern, fully responsive website for xCombinator - a Solana-focused launch platform.

**Key Features:**
- Glassmorphism design with gradient animations
- Fully responsive (mobile, tablet, desktop)
- Multiple pages: Home, Products, Ambassadors, Contact, $X Token
- Interactive UI components with hover effects
- Mobile hamburger menu navigation
- Newsletter subscription
- Social media integration

**Technologies:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- Lucide Icons

**Quick Start:**
```bash
cd xcombinator-website_task-2
npm install
npm run dev
```

**Live Demo:** [https://xcombinator-blue.vercel.app/](https://xcombinator-blue.vercel.app/)

---

### Task 3: Solana Token Staking DApp
**Directory:** `solana-staking-dapp_task-3/`

A full-stack decentralized application for staking SPL tokens on Solana with a modern user interface.

**Key Features:**
- Wallet integration (Phantom, Solflare, etc.)
- Token staking with customizable lock durations
- Real-time stake account display
- Associated token account management
- Balance validation
- Transaction status tracking
- Responsive design

**Technologies:**
- Next.js 15
- React 19
- TypeScript
- Anchor Framework
- @solana/wallet-adapter
- TailwindCSS

**Quick Start:**
```bash
cd solana-staking-dapp_task-3
npm install
npm run dev
```

**Live Demo:** [https://tasks-fullstack-solana-dev.vercel.app/](https://tasks-fullstack-solana-dev.vercel.app/)

**Program Details:**
- Program ID: `Hv6Q2KdFtbdobWYEeMWJ2yPfmg6efMZPd3A6mfKN3L7W`
- Token Mint: `Cx97mtHU9hKb3XWeKcDPHgLyEB8vguoNxEsnyGUmm4G9`
- Network: Solana Devnet

---

##  Technologies Used

### Blockchain & Web3
- **Solana Web3.js** - Solana blockchain interaction
- **Anchor Framework** - Solana program development framework
- **SPL Token** - Solana token program utilities
- **Wallet Adapter** - Multi-wallet support for Solana

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Lucide Icons** - Modern icon library

### Development Tools
- **Node.js** - JavaScript runtime
- **npm** - Package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

### Deployment
- **Vercel** - Hosting platform for web applications

---

##  Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Git** for version control
- **Solana wallet** (Phantom, Solflare, etc.) for DApp tasks
- **SOL tokens** on Devnet for testing

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd intern-task
```

2. **Navigate to specific task:**
```bash
# For Task 1
cd escrow-deposit_task-1

# For Task 2
cd xcombinator-website_task-2

# For Task 3
cd solana-staking-dapp_task-3
```

3. **Install dependencies:**
```bash
npm install
```

4. **Run the project:**
```bash
# For Task 1 (CLI script)
npm run deposit

# For Task 2 & 3 (Web apps)
npm run dev
```

### Environment Setup

Each task has its own configuration:

- **Task 1**: Edit constants in `deposit.ts` or use environment variables
- **Task 2**: No environment variables needed
- **Task 3**: Configure program IDs in `lib/constants.ts`

---

##  Documentation

Each task folder contains its own detailed README with:
- Comprehensive feature descriptions
- Installation and setup instructions
- Usage examples
- Configuration options
- Troubleshooting guides
- Technical architecture details

Please refer to individual README files for task-specific documentation:
- [Task 1 README](./escrow-deposit_task-1/README.md)
- [Task 2 README](./xcombinator-website_task-2/README.md)
- [Task 3 README](./solana-staking-dapp_task-3/README.md)

---

##  Learning Outcomes

This project demonstrates proficiency in:

1. **Solana Blockchain Development**
   - Program Derived Addresses (PDAs)
   - SPL Token operations
   - Transaction construction
   - Account management

2. **Smart Contract Interaction**
   - Anchor framework integration
   - IDL usage
   - Instruction encoding
   - Account filtering

3. **Full-Stack Web Development**
   - Next.js App Router
   - React component architecture
   - TypeScript type safety
   - Responsive design

4. **DApp Development**
   - Wallet integration
   - Real-time blockchain data
   - User experience optimization
   - Error handling

5. **DevOps & Deployment**
   - Vercel deployment
   - Environment configuration
   - Production optimization

---

## License

This project is created for educational and demonstration purposes as part of an assignment.

---

**Note:** All projects are configured for Solana Devnet. Test thoroughly before adapting for production use on Mainnet.
