import { useEffect, useState } from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NFTCard } from "@/components/nft-card"

function App() {
  const [contractAddresses, setContractAddresses] = useState<`0x${string}`[]>([])

  useEffect(() => {
    const addresses = import.meta.env.VITE_NFT_CONTRACT_ADDRESSES?.split(',').map((addr: `0x${string}`) => addr.trim()) || []
    setContractAddresses(addresses)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            NFT Mint DApp
          </h1>
          <ConnectButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contractAddresses.map((address) => (
            <NFTCard key={address} contractAddress={address} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
