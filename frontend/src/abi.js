// Counter.sol ABI — copy artifacts/contracts/Counter.sol/Counter.json after compile
export const COUNTER_ABI = [
  { name: 'count',     type: 'function', stateMutability: 'view',
    inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'owner',     type: 'function', stateMutability: 'view',
    inputs: [], outputs: [{ name: '', type: 'address' }] },
  { name: 'increment', type: 'function', stateMutability: 'nonpayable',
    inputs: [], outputs: [] },
  { name: 'decrement', type: 'function', stateMutability: 'nonpayable',
    inputs: [], outputs: [] },
  { name: 'reset',     type: 'function', stateMutability: 'nonpayable',
    inputs: [], outputs: [] },
  { name: 'CountChanged', type: 'event',
    inputs: [{ name: 'newCount', type: 'uint256', indexed: false }] },
]
