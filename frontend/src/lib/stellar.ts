import * as StellarSdk from '@stellar/stellar-sdk'

export const getNetwork = () => {
  const network = process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'testnet'
  return network === 'mainnet'
    ? StellarSdk.Networks.PUBLIC
    : StellarSdk.Networks.TESTNET
}

export const getServer = () => {
  const network = process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'testnet'
  const horizonUrl =
    network === 'mainnet'
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org'
  return new StellarSdk.Horizon.Server(horizonUrl)
}

export const getContractAddress = () => {
  return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
}
