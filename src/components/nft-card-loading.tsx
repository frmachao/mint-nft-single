import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

interface NFTCardLoadingProps {
  contractAddress: `0x${string}`
}

export function NFTCardLoading({ contractAddress }: NFTCardLoadingProps) {
  return (
    <Card className="w-[350px] bg-black/40 backdrop-blur-sm border-neutral-800 hover:border-neutral-700 transition-all duration-300">
      <CardHeader>
        <div className="relative group">
          <Skeleton className="w-full h-[200px] rounded-lg" />
        </div>
        <Skeleton className="h-8 w-3/4 mt-4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-neutral-300 font-mono">
            Contract: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
          </div>
          <Skeleton className="h-6 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
} 