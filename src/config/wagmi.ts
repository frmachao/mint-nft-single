import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'viem'
import { sepolia, bsc } from 'viem/chains'
import { QueryClient } from '@tanstack/react-query'
import {
    metaMaskWallet,
    okxWallet,
    oneKeyWallet,
    bitgetWallet,
    trustWallet,
    coinbaseWallet,
    binanceWallet,
    walletConnectWallet,
  } from '@rainbow-me/rainbowkit/wallets'

export const queryClient = new QueryClient()

export const wagmiConfig = getDefaultConfig({
  appName: 'NFT Mint DApp',
  projectId: import.meta.env.VITE_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [bsc, sepolia],
  transports: {
    [bsc.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: false,
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        okxWallet,
        oneKeyWallet,
        bitgetWallet,
        trustWallet,
        coinbaseWallet,
        binanceWallet,
        walletConnectWallet,
      ]
    }
  ],
}) 