import { useEffect, useState } from "react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NFTCard } from "@/components/nft-card"
import { useToast } from "@/hooks/use-toast"
import { useChainId } from 'wagmi'
interface NFTContract {
  id: string
  address: `0x${string}`
  createdAt: string
  updatedAt: string
}

function App() {
  const [contractAddresses, setContractAddresses] = useState<`0x${string}`[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const  chainId  = useChainId()

  useEffect(() => {
    const fetchNFTContracts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://nft-maker-alpha.vercel.app/api/nft-mints?chainId=${chainId || 56}`)
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
  }, [chainId, toast])

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
  if(contractAddresses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-950">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              NFT Mint DApp
            </h1>
            <ConnectButton />
          </div>
          <div className="flex justify-center items-center">
            <p className="text-lg text-neutral-400">No NFT contracts found. Please connect to a supported chain.</p>
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
