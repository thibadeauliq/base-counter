const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Counter', function () {
  let counter, owner, other

  beforeEach(async () => {
    ;[owner, other] = await ethers.getSigners()
    const Counter = await ethers.getContractFactory('Counter')
    counter = await Counter.connect(owner).deploy()
  })

  it('starts at 0', async () => {
    expect(await counter.count()).to.equal(0n)
  })

  it('increments by 1', async () => {
    await counter.increment()
    expect(await counter.count()).to.equal(1n)
  })

  it('increments multiple times', async () => {
    await counter.increment()
    await counter.increment()
    await counter.increment()
    expect(await counter.count()).to.equal(3n)
  })

  it('decrements by 1', async () => {
    await counter.increment()
    await counter.decrement()
    expect(await counter.count()).to.equal(0n)
  })

  it('reverts decrement at zero', async () => {
    await expect(counter.decrement()).to.be.revertedWithCustomError(counter, 'CountIsZero')
  })

  it('resets to 0 as owner', async () => {
    await counter.increment()
    await counter.increment()
    await counter.reset()
    expect(await counter.count()).to.equal(0n)
  })

  it('reverts reset from non-owner', async () => {
    await expect(counter.connect(other).reset()).to.be.revertedWithCustomError(counter, 'NotOwner')
  })

  it('emits CountChanged on increment', async () => {
    await expect(counter.increment())
      .to.emit(counter, 'CountChanged')
      .withArgs(1n)
  })
})
