# Kreatives Frontend

Next.js frontend for Kreatives platform.

## Features

* **Wallet Connection**: Connect Freighter wallet
* **Creator Discovery**: Browse creators and content
* **Subscription Management**: Subscribe and manage subscriptions
* **Content Access**: View gated content based on subscriptions

## Prerequisites

* Node.js 18+
* Freighter Wallet browser extension

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

## Running

```bash
# Development
npm run dev

# Production
npm run build
npm run start
```

## Development Status

This is a minimal implementation (10% of full functionality) demonstrating:
- Next.js 14 App Router structure
- Wallet connection with Freighter
- Basic UI components
- Stellar SDK integration

Full implementation would include:
- Creator dashboard
- Subscription flows
- Content browsing
- Payment processing
- User profiles
- Analytics
- Mobile responsive design
