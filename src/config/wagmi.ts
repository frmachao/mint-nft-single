import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'viem'
import { sepolia } from 'viem/chains'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const wagmiConfig = getDefaultConfig({
  appName: 'NFT Mint DApp',
  projectId: import.meta.env.VITE_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: false,
}) 