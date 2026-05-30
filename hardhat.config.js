require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY || '0'.repeat(64)
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.24',
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    // Base Mainnet
    base: {
      url: 'https://mainnet.base.org',
      accounts: [PRIVATE_KEY],
      chainId: 8453,
    },
    // Base Sepolia (testnet) — free ETH from https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [PRIVATE_KEY],
      chainId: 84532,
    },
  },
  etherscan: {
    apiKey: { 'base-sepolia': BASESCAN_API_KEY, base: BASESCAN_API_KEY },
    customChains: [
      {
        network: 'base-sepolia',
        chainId: 84532,
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org',
        },
      },
    ],
  },
}
