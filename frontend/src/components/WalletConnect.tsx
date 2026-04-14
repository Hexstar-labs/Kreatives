'use client'

import { useState } from 'react'

interface WalletConnectProps {
  onConnect: (publicKey: string) => void
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const connectWallet = async () => {
    setLoading(true)
    setError('')

    try {
      // Check if Freighter is installed
      if (typeof window !== 'undefined' && (window as any).freighter) {
        const { publicKey } = await (window as any).freighter.getPublicKey()
        onConnect(publicKey)
      } else {
        setError('Freighter wallet not found. Please install it.')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Connect Wallet</h3>
      <button
        onClick={connectWallet}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Connecting...' : 'Connect Freighter Wallet'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
        Don't have Freighter? <a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3' }}>Install it here</a>
      </p>
    </div>
  )
}
