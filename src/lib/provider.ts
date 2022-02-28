import { ethers } from "ethers"
import WalletConnectProvider from "@walletconnect/web3-provider"

/**
 * copied from wallet connect
 */
export const ProviderErrorCodes = {
  rpc: {
    invalidInput: -32e3,
    resourceNotFound: -32001,
    resourceUnavailable: -32002,
    transactionRejected: -32003,
    methodNotSupported: -32004,
    limitExceeded: -32005,
    parse: -32700,
    invalidRequest: -32600,
    methodNotFound: -32601,
    invalidParams: -32602,
    internal: -32603,
  },
  provider: {
    userRejectedRequest: 4001,
    unauthorized: 4100,
    unsupportedMethod: 4200,
    disconnected: 4900,
    chainDisconnected: 4901,
  },
}

/**
 * Get wallet connect provider ETH provider
 * Metamask => web3 provider
 * Trust wallet => web3 provider
 *
 * There some kind of providers, each provider support different request fn with a same purpose:
 * - provider.request
 * - provider.sendAsync
 * - provider.send
 * For more detail: node_modules/@ethersproject/providers/src.ts/web3-provider.ts --> class Web3Provider
 *
 *
 * Tested with:
 * - [x] Trust Wallet via Wallet connect
 * - [ ] TODO: Test the metamask
 * - [ ] TODO: Test the C98
 *
 *
 * @deprecated Do not use this anymore. Please use web3Provider().send() instead of:
 *  - window.ethereum.request()
 *  - signer.provider.provider.request()
 * window.ethereum is for web3 injected like metamask only
 * IF you wanna support multiple wallet (including mobile wallet),
 * you need to use a universal abstract provider from web3provider
 *
 * Eg: Do not use this:
 *    const signed_hash = await window.ethereum.request({
 *      method: 'personal_sign',
 *      params: params,
 *    })
 * Use this instead:
 *    const signed_hash = await web3provider.send('personal_sign', params)
 */
export function getWcProvider(
  signer: ethers.providers.JsonRpcSigner
): WalletConnectProvider {
  // const provider = window.ethereum; // This is for metamask PC only
  // @ts-ignore
  const provider = signer.provider.provider // This is for wallet connect

  return provider
}
