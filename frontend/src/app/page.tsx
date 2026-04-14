'use client'

import { useState } from 'react'
import WalletConnect from '@/components/WalletConnect'

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState('')

  const handleConnect = (key: string) => {
    setConnected(true)
    setPublicKey(key)
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Kreatives</h1>
        <p>Decentralized Content Subscription Platform</p>
      </header>

      <WalletConnect onConnect={handleConnect} />

      {connected && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Welcome!</h2>
          <p>Connected: {publicKey.substring(0, 8)}...{publicKey.substring(publicKey.length - 8)}</p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Getting Started</h3>
            <ul>
              <li>Explore creators and their content</li>
              <li>Subscribe to your favorite creators</li>
              <li>Manage your subscriptions</li>
            </ul>
          </div>
        </div>
      )}

      {!connected && (
        <div style={{ marginTop: '2rem' }}>
          <h2>About Kreatives</h2>
          <p>
            Kreatives is a decentralized content subscription platform built on Stellar.
            Connect your wallet to get started.
          </p>
        </div>
      )}
    </main>
  )
}
