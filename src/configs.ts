export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const TEST_API_URL = process.env.NEXT_PUBLIC_TEST_API_URL
export const REQUIRED_CHAINID = +process.env.NEXT_PUBLIC_REQUIRED_CHAINID
export const LUCIS_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_LUCIS_CONTRACT_ADDRESS
export const DEFAULT_TOKEN_ADDRESS =
  process.env.NEXT_PUBLIC_LUCIS_CONTRACT_ADDRESS
export const BSC_SCAN_ADDRESS = `https://${
  REQUIRED_CHAINID === 56 ? "testnet." : ""
}bscscan.com/address/`
export const BSC_SCAN_TRANSACTION = `https://${
  REQUIRED_CHAINID === 56 ? "testnet." : ""
}bscscan.com/tx/`
