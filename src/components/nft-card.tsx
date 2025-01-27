import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useChainId
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Expand, Clock } from "lucide-react";
import { NFTCollectionABI } from "@/lib/abi";
import { formatEther } from "viem";
import { useEffect, useState, useMemo } from "react";
import { NFTCardLoading } from "./nft-card-loading";
import { useToast } from "@/hooks/use-toast"
import dayjs from 'dayjs'
import { getCurrencySymbol } from '@/lib/utils'

interface NFTCardProps {
  contractAddress: `0x${string}`;
}

export function NFTCard({ contractAddress }: NFTCardProps) {
  const { isConnected, address: userAddress } = useAccount();
  const { writeContract, isPending, data: hash,isError:isWriteError } = useWriteContract();
  const [mintPeriod, setMintPeriod] = useState<string>("");
  const { toast } = useToast()
  const chainId = useChainId()

  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: NFTCollectionABI,
        functionName: "name",
      },
      {
        address: contractAddress,
        abi: NFTCollectionABI,
        functionName: "maxSupply",
      },
      {
        address: contractAddress,
        abi: NFTCollectionABI,
        functionName: "description",
      },
      {
        address: contractAddress,
        abi: NFTCollectionABI,
        functionName: "image",
      },
      {
        address: contractAddress,
        abi: NFTCollectionABI,
        functionName: "mintPrice",
      },
      {
        address: contractAddress,
        abi: NFTCollectionABI,
        functionName: "mintStartTime",
      },
      {
        address: contractAddress,
        abi: NFTCollectionABI,
        functionName: "mintEndTime",
      },
      {
        address: contractAddress as `0x${string}`,
        abi: NFTCollectionABI,
        functionName: "paused",
      },
      {
        address: contractAddress as `0x${string}`,
        abi: NFTCollectionABI,
        functionName: "whitelistOnly",
      },
      {
        address: contractAddress as `0x${string}`,
        abi: NFTCollectionABI,
        functionName: "whitelist",
        args: [userAddress as `0x${string}`],
      },
    ],
  });
  const {
    isLoading: isMinting,
    isSuccess,
    isError: isMintError,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: contractAddress,
    abi: NFTCollectionABI,
    functionName: "totalSupply",
  });

  const [
    name,
    maxSupply,
    description,
    imageUrl,
    mintPrice,
    mintStartTime,
    mintEndTime,
    paused,
    whitelistOnly,
    userIsWhitelisted,
  ] = data?.map((result) => result.result) ?? [];


  const handleMint = async () => {
    writeContract({
      address: contractAddress,
      abi: NFTCollectionABI,
      functionName: "mint",
      value: mintPrice as bigint,
    });
  };

  const isDisabled = useMemo(() => {
    if (!isConnected || isPending || isMinting) return true;
    
    const now = Math.floor(Date.now() / 1000);
    
    if (Number(mintStartTime) > 0 && now < Number(mintStartTime)) {
      return true;
    }
    
    if (Number(mintEndTime) > 0 && now > Number(mintEndTime)) {
      return true;
    }
    
    if (paused) return true;
    
    if (whitelistOnly && !userIsWhitelisted) return true;
    
    if (totalSupply && maxSupply && Number(totalSupply) >= Number(maxSupply)) {
      return true;
    }
    
    return false;
  }, [
    isConnected, 
    isPending, 
    isMinting, 
    mintStartTime, 
    mintEndTime, 
    paused, 
    whitelistOnly, 
    userIsWhitelisted,
    totalSupply,
    maxSupply
  ]);

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (isPending) return "Confirming...";
    if (isMinting) return "Minting...";
    
    const now = Math.floor(Date.now() / 1000);
    
    if (Number(mintStartTime) > 0 && now < Number(mintStartTime)) {
      return "Mint Not Started";
    }
    
    if (Number(mintEndTime) > 0 && now > Number(mintEndTime)) {
      return "Mint Ended";
    }
    
    if (paused) return "Mint Paused";
    
    if (whitelistOnly && !userIsWhitelisted) {
      return "Not Whitelisted";
    }
    
    if (totalSupply && maxSupply && Number(totalSupply) >= Number(maxSupply)) {
      return "Sold Out";
    }
    
    return "Mint NFT";
  };

  useEffect(() => {
    if (
      mintStartTime &&
      mintEndTime &&
      Number(mintStartTime) > 0 &&
      Number(mintEndTime) > 0
    ) {
      const start = dayjs(Number(mintStartTime) * 1000).format('YYYY-MM-DD HH:mm');
      const end = dayjs(Number(mintEndTime) * 1000).format('YYYY-MM-DD HH:mm');
      setMintPeriod(`${start}\n${end}`);
    }
  }, [mintStartTime, mintEndTime]);

  useEffect(() => {
    if (isSuccess) {
      refetchTotalSupply();
      toast({
        title: "Mint Success",
        description: "You have successfully minted an NFT",
      });
    }
    if (isMintError || isWriteError) {
      toast({
        title: "Mint Error",
        description: "Mint failed, please try again",
        variant: "destructive",
      });
    }
  }, [isSuccess, refetchTotalSupply, isMintError, isWriteError]);

  if (isLoading) {
    return <NFTCardLoading contractAddress={contractAddress} />;
  }

  const mintProgress = !totalSupply || !maxSupply ? 0 :(Number(totalSupply) / Number(maxSupply)) * 100;

  return (
    <Card className="w-[350px] bg-black/40 backdrop-blur-sm border-neutral-800 hover:border-neutral-700 transition-all duration-300">
      <CardHeader>
        <div className="relative group">
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer rounded-lg overflow-hidden">
                <img
                  src={imageUrl as string}
                  alt="NFT"
                  className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Expand className="w-8 h-8 text-white" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <img
                src={imageUrl as string}
                alt="NFT"
                className="w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        </div>
        <CardTitle className="mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {name as string}
        </CardTitle>
        {!!description && (
          <CardDescription className="text-neutral-400">
            {description as string}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-neutral-300 font-mono">
            Contract: {contractAddress.slice(0, 6)}...
            {contractAddress.slice(-4)}
          </div>
          {!!mintPrice && Number(mintPrice) > 0 && (
            <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Mint Price: {formatEther(mintPrice as bigint)} {getCurrencySymbol(chainId || 56)}
            </div>
          )}
          {mintPeriod && (
            <div className="flex flex-col gap-1 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mint Period</span>
              </div>
              <div className="pl-6 space-y-1">
                <div>Start: {mintPeriod.split('\n')[0]}</div>
                <div>End: {mintPeriod.split('\n')[1]}</div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-400">
              <span>Total Minted</span>
              <span>
                {totalSupply?.toString()} / {maxSupply?.toString()}
              </span>
            </div>
            <Progress value={mintProgress} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isConnected ? (
          <ConnectButton />
        ) : (
          <Button
            onClick={handleMint}
            disabled={isDisabled}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {getButtonText()}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
