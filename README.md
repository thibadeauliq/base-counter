# base-counter

A minimal end-to-end Base app — Solidity counter contract deployed to **Base Sepolia** with a React + wagmi frontend.

Based on the [Base get-started guide](https://docs.base.org/get-started/base).

## What's inside
```
contracts/          Solidity sources
  Counter.sol       Simple increment/decrement/reset counter
scripts/            Hardhat deploy scripts
  deploy.js         Deploy Counter to Base Sepolia
frontend/           Vite + React + wagmi dapp
  src/              Components, hooks, wagmi config
test/               Hardhat tests
```

## Quick start

### 1. Install dependencies
```bash
npm install
cd frontend && npm install
```

### 2. Configure env
```bash
cp .env.example .env
# fill in PRIVATE_KEY and BASESCAN_API_KEY
```

### 3. Deploy to Base Sepolia
```bash
npx hardhat run scripts/deploy.js --network base-sepolia
```

### 4. Run the frontend
```bash
cd frontend
VITE_CONTRACT_ADDRESS=0x... npm run dev
```

## Contract ABI
The counter exposes three functions:
- `increment()` — add 1 to the count
- `decrement()` — subtract 1 (reverts at 0)
- `reset()` — set count back to 0 (owner only)
- `count()` — view current value
