import { useState } from 'react'
import {
  useAccount, useConnect, useDisconnect,
  useReadContract, useWriteContract, useWaitForTransactionReceipt
} from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { COUNTER_ABI } from './abi'

const CONTRACT = import.meta.env.VITE_CONTRACT_ADDRESS

export default function App() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: count, refetch } = useReadContract({
    address: CONTRACT,
    abi: COUNTER_ABI,
    functionName: 'count',
    chainId: baseSepolia.id,
    watch: true,
  })

  const { writeContract, data: txHash, isPending } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash,
    onSuccess: () => refetch(),
  })

  const busy = isPending || isConfirming

  const call = (fn) => writeContract({
    address: CONTRACT,
    abi: COUNTER_ABI,
    functionName: fn,
    chainId: baseSepolia.id,
  })

  if (!isConnected) return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🔵 Base Counter</h1>
      <p style={{ color: '#888', marginBottom: 24 }}>Connect your wallet to interact with the contract</p>
      {connectors.map(c => (
        <button key={c.id} onClick={() => connect({ connector: c })}
          style={{ background: '#0052FF', color: '#fff', margin: 4 }}>
          {c.name}
        </button>
      ))}
    </div>
  )

  return (
    <div style={{ textAlign: 'center', maxWidth: 360 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>🔵 Base Counter</h1>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 32 }}>
        {address?.slice(0, 6)}…{address?.slice(-4)}
        &nbsp;·&nbsp;
        <button onClick={() => disconnect()}
          style={{ background: 'none', color: '#888', padding: 0, fontSize: 13, fontWeight: 400 }}>
          disconnect
        </button>
      </p>

      <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2, marginBottom: 32 }}>
        {count?.toString() ?? '—'}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => call('decrement')} disabled={busy || count === 0n}
          style={{ background: '#222', color: '#fff', fontSize: 24, padding: '8px 20px' }}>−</button>
        <button onClick={() => call('increment')} disabled={busy}
          style={{ background: '#0052FF', color: '#fff', fontSize: 24, padding: '8px 20px' }}>+</button>
      </div>
      <button onClick={() => call('reset')} disabled={busy}
        style={{ background: '#1a1a1a', color: '#888', fontSize: 13 }}>
        Reset (owner only)
      </button>

      {txHash && (
        <p style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
          <a href={`https://sepolia.basescan.org/tx/${txHash}`}
             target="_blank" rel="noreferrer" style={{ color: '#0052FF' }}>
            {isConfirming ? 'Confirming…' : 'View tx ↗'}
          </a>
        </p>
      )}
    </div>
  )
}
