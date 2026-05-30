const { ethers, network } = require('hardhat')

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log(`Deploying Counter with account: ${deployer.address}`)
  console.log(`Network: ${network.name}`)

  const Counter = await ethers.getContractFactory('Counter')
  const counter = await Counter.deploy()
  await counter.waitForDeployment()

  const address = await counter.getAddress()
  console.log(`Counter deployed to: ${address}`)
  console.log(`View on Basescan: https://sepolia.basescan.org/address/${address}`)

  // Verify on Basescan if not on localhost
  if (network.name !== 'localhost' && network.name !== 'hardhat') {
    console.log('Waiting 5 confirmations before verifying...')
    await counter.deploymentTransaction()?.wait(5)
    try {
      await run('verify:verify', { address, constructorArguments: [] })
      console.log('Contract verified on Basescan')
    } catch (e) {
      console.warn('Verification skipped:', e.message)
    }
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
