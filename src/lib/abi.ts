import { parseAbiItem } from "viem";
const pausedAbi = parseAbiItem(
  "function paused() external view returns (bool)"
);
// 白名单管理相关的 ABI
const whitelistAbi = {
  functions: {
    // 查询白名单状态
    whitelist: parseAbiItem(
      "function whitelist(address) external view returns (bool)"
    ),
    // 查询白名单模式
    whitelistOnly: parseAbiItem(
      "function whitelistOnly() external view returns (bool)"
    ),
  },
} as const;
export const NFTCollectionABI = [
  pausedAbi,
  whitelistAbi.functions.whitelist,
  whitelistAbi.functions.whitelistOnly,
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "maxSupply",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "description",
    inputs: [],
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "image",
    inputs: [],
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mintPrice",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mintStartTime",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mintEndTime",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
] as const;
