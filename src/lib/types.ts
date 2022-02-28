export interface IAssetData {
  symbol: string
  name: string
  decimals: string
  contractAddress: string
  balance?: string
}

export interface IChainData {
  name: string
  short_name: string
  chain: string
  network: string
  chain_id: number
  network_id: number
  rpc_url: string
  native_currency: IAssetData
  blockExplorerUrls?: string[]
  iconUrls?: string[]
}

interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

export function convertIChainData2ChainParameter(
  c: IChainData
): AddEthereumChainParameter {
  return {
    chainId: "0x" + c.chain_id.toString(16), // A 0x-prefixed hexadecimal string
    chainName: c.name,
    nativeCurrency: {
      name: c.native_currency.name,
      symbol: c.native_currency.symbol, // 2-6 characters long
      decimals: parseInt(c.native_currency.decimals),
    },
    rpcUrls: [c.rpc_url],
    blockExplorerUrls: c.blockExplorerUrls,
    iconUrls: c.iconUrls, // Currently ignored.
  }
}

export interface ITxData {
  from: string
  to: string
  nonce: string
  gasPrice: string
  gasLimit: string
  value: string
  data: string
}

export interface IBlockScoutTx {
  value: string
  txreceipt_status: string
  transactionIndex: string
  to: string
  timeStamp: string
  nonce: string
  isError: string
  input: string
  hash: string
  gasUsed: string
  gasPrice: string
  gas: string
  from: string
  cumulativeGasUsed: string
  contractAddress: string
  confirmations: string
  blockNumber: string
  blockHash: string
}

export interface IBlockScoutTokenTx {
  value: string
  transactionIndex: string
  tokenSymbol: string
  tokenName: string
  tokenDecimal: string
  to: string
  timeStamp: string
  nonce: string
  input: string
  hash: string
  gasUsed: string
  gasPrice: string
  gas: string
  from: string
  cumulativeGasUsed: string
  contractAddress: string
  confirmations: string
  blockNumber: string
  blockHash: string
}

export interface IParsedTx {
  timestamp: string
  hash: string
  from: string
  to: string
  nonce: string
  gasPrice: string
  gasUsed: string
  fee: string
  value: string
  input: string
  error: boolean
  asset: IAssetData
  operations: ITxOperation[]
}

export interface ITxOperation {
  asset: IAssetData
  value: string
  from: string
  to: string
  functionName: string
}

export interface IGasPricesResponse {
  fastWait: number
  avgWait: number
  blockNum: number
  fast: number
  fastest: number
  fastestWait: number
  safeLow: number
  safeLowWait: number
  speed: number
  block_time: number
  average: number
}

export interface IGasPrice {
  time: number
  price: number
}

export interface IGasPrices {
  timestamp: number
  slow: IGasPrice
  average: IGasPrice
  fast: IGasPrice
}

export interface IMethodArgument {
  type: string
}

export interface IMethod {
  signature: string
  name: string
  args: IMethodArgument[]
}

export interface IBoxImage {
  "@type": string
  contentUrl: {
    [label: string]: string
  }
}

export interface IBoxProfile {
  memberSince: string
  coverPhoto: IBoxImage[]
  location: string
  emoji: string
  job: string
  employer: string
  website: string
  description: string
  ethereum_proof: {
    consent_msg: string
    consent_signature: string
    linked_did: string
  }
  proof_did: string
  github: string
  image: IBoxImage[]
  name: string
}
