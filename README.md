# NFT Mint DApp

A modern and elegant NFT minting application built with React, Vite, and Web3 technologies.

![NFT Mint DApp Screenshot](./assets/screenshot.png)

## Features

- 🎨 Modern UI with glassmorphism design
- 🌈 Beautiful gradient animations
- 💳 Seamless wallet connection with RainbowKit
- ⛓️ Multi-chain support
- 🖼️ NFT preview with zoom capability
- 📊 Real-time minting progress
- ⏰ Mint period display
- 🔄 Loading states with skeleton UI

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- RainbowKit
- Wagmi
- Viem

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/nft-mint-dapp.git
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your contract addresses and WalletConnect project ID.

4. Start the development server
```bash
pnpm dev
```

## Environment Variables

- `VITE_NFT_CONTRACT_ADDRESSES`: Comma-separated list of NFT contract addresses
- `VITE_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect project ID

## Contract Integration

The DApp integrates with NFT contracts that implement the following interface:
- totalSupply
- maxSupply
- description
- image
- mintPrice
- mintStartTime
- mintEndTime
- mint function

## License

MIT
