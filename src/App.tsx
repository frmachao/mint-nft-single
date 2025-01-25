import { useEffect, useState } from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NFTCard } from "@/components/nft-card"
import { useToast } from "@/hooks/use-toast"

interface NFTContract {
  id: string
  address: `0x${string}`
  createdAt: string
  updatedAt: string
}

function App() {
  const [contractAddresses, setContractAddresses] = useState<`0x${string}`[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNFTContracts = async () => {
      try {
        const response = await fetch('https://nft-maker-alpha.vercel.app/api/nft-mints')
        const data: NFTContract[] = await response.json()
        const addresses = data.map(contract => contract.address as `0x${string}`)
        setContractAddresses(addresses)
      } catch (error) {
        console.error('Failed to fetch NFT contracts:', error)
        toast({
          title: "Error",
          description: "Failed to fetch NFT contracts. Please try again later.",
          variant: "destructive",
        })
        setContractAddresses([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchNFTContracts()
  }, [toast])

  if (isLoading) {
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
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="w-[350px] h-[600px] bg-black/40 backdrop-blur-sm border border-neutral-800 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

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
