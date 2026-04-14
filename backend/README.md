# Kreatives Backend

NestJS API for Kreatives platform.

## Features

* **Auth**: JWT-based authentication with Stellar wallet signatures
* **Subscription**: Check subscription status, manage subscriptions
* **Content**: Content metadata and access control

## Prerequisites

* Node.js 18+
* PostgreSQL

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Running

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Auth
* `POST /auth/login` - Login with Stellar wallet

### Subscription
* `GET /subscription/check?fan=<address>&creator=<address>` - Check subscription
* `GET /subscription/creator/:creator` - Get creator subscribers
* `GET /subscription/fan/:fan` - Get fan subscriptions

### Content
* `GET /content/creator/:creator` - Get creator content
* `GET /content/:id/access?fan=<address>` - Check content access

## Development Status

This is a minimal implementation (10% of full functionality) demonstrating:
- Basic NestJS structure
- Auth with JWT
- Subscription checking endpoints
- Content access endpoints

Full implementation would include:
- Database entities and migrations
- Soroban contract integration
- Event indexer
- IPFS integration
- Notifications
- Analytics
