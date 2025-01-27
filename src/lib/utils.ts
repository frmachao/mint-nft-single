import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencySymbol(chainId: number) {
  switch (chainId) {
    case 56: // BSC
      return 'BNB'
    case 11155111: // Sepolia
      return 'ETH'
    default:
      return 'ETH'
  }
}
