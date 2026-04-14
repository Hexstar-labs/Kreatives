# Kreatives – Decentralized Content Subscription Platform

**Kreatives** is a decentralized content subscription platform built on **Stellar** and **Soroban**. It empowers creators to monetize their work through on-chain subscriptions, direct payments, and transparent revenue streams—leveraging Stellar's speed, low cost, and multi-currency support.

## Why Stellar?

* **Speed & Cost**: 3–5 second finality with minimal fees, ideal for subscriptions and micro-payments
* **Multi-Currency**: Native support for XLM and Stellar assets (USDC, EURT) enabling flexible payment options
* **Soroban**: Rust/Wasm smart contracts with deterministic execution and robust SDK
* **Ecosystem**: Anchors and on/off-ramps connect subscriptions to fiat (card, bank)
* **Scale**: High throughput without gas auctions or volatile fees

## Problems Kreatives Solves

| Problem | Kreatives Approach |
|---------|-------------------|
| High platform fees | Direct creator payouts with minimal, transparent protocol fees |
| Delayed or opaque payments | On-chain subscriptions with instant settlement |
| Single-currency lock-in | Pay in XLM or any Stellar asset (e.g., USDC) |
| Centralized access control | Subscription and access enforced via Soroban contracts |
| No fiat-friendly path | Backend + frontend integrate anchors/ramps for card/bank |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Kreatives Platform                               │
├─────────────────┬─────────────────────────┬─────────────────────────────┤
│   frontend/     │      backend/           │      contract/              │
│   (Next.js)     │      (NestJS)           │      (Soroban/Rust)         │
├─────────────────┼─────────────────────────┼─────────────────────────────┤
│ • Wallet connect│ • Auth & sessions       │ • Subscription lifecycle    │
│   (Freighter,   │ • Creator/fan APIs      │ • Payment routing & fees    │
│    Lobstr)      │ • Content metadata      │ • Access control            │
│ • Creator       │ • IPFS / storage refs   │ • Multi-asset payments      │
│   dashboard     │ • Webhooks / events     │ • Pause, cancel, renew      │
│ • Fan discovery │ • Indexer / analytics   │                             │
│ • Subscription  │ • Notifications         │                             │
│   management    │                         │                             │
└────────┬────────┴────────────┬────────────┴──────────────┬──────────────┘
         │                     │                            │
         └─────────────────────┼────────────────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │  Stellar / Soroban    │
                    │  (XLM, USDC, etc.)    │
                    └──────────────────────┘
```

## Repository Structure

| Folder | Role |
|--------|------|
| **`contract/`** | Soroban smart contracts (Rust). Subscription state, payments, access control |
| **`frontend/`** | Next.js app. Creator and fan UI, wallet connection, subscription flows |
| **`backend/`** | NestJS API. Auth, content metadata, IPFS refs, indexing, notifications |

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Chain & Contracts | Stellar, Soroban, Rust, soroban-sdk, stellar-cli |
| Frontend | Next.js, TypeScript, Stellar SDK, wallet integration |
| Backend | NestJS, TypeScript, PostgreSQL, Stellar/Soroban RPC, IPFS |
| Storage | IPFS (content refs), PostgreSQL (metadata, indexer cache) |

## Smart Contract (Soroban) – `contract/`

### Responsibilities
* **Subscription lifecycle**: Create, renew, cancel, pause subscriptions
* **Payment logic**: Accept payments in configured Stellar assets; split creator vs protocol fee
* **Access control**: Expose "is subscriber" for backend/frontend to gate content
* **Multi-asset**: Support XLM and Stellar tokens (USDC) for creator flexibility

### Core Contract Interface
* `init(admin, protocol_fee_bps, fee_recipient)` – Initialize with fee structure
* `create_plan(creator, asset, amount, interval_days)` – Define subscription plan
* `subscribe(fan, plan_id, duration)` – Fan subscribes; payment transferred
* `renew(subscription_id)` – Renew subscription
* `cancel(subscription_id)` – Cancel subscription
* `is_subscriber(fan, creator)` → bool – Check subscription status

## Backend – `backend/`

### Responsibilities
* **Auth**: Sessions/JWTs linking Stellar public keys to users
* **Creator/Fan APIs**: Profiles, plans metadata, content catalog
* **Content & IPFS**: Store content metadata and IPFS links
* **Indexer**: Subscribe to Soroban events for analytics and fast subscription checks
* **Notifications**: Email/in-app for new subscribers, renewals, cancellations
* **Optional**: Integrate Stellar anchors/ramps for fiat on/off-ramp

## Frontend – `frontend/`

### Responsibilities
* **Wallets**: Connect Freighter, Lobstr, or other Stellar wallets
* **Creators**: Dashboard to create plans, set pricing, view subscribers and earnings
* **Fans**: Discover creators, view plans, subscribe, manage subscriptions
* **UX**: Show subscription status, next billing, and access to gated content

## Getting Started

### Prerequisites
* Node.js 18+ and npm
* Rust and Cargo
* Stellar CLI (`cargo install stellar-cli`)
* PostgreSQL
* Freighter Wallet browser extension

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Hexstar-labs/Kreatives.git
cd Kreatives
```

2. **Install dependencies**
```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install

# Contracts
cd ../contract && cargo build --release --target wasm32-unknown-unknown
```

3. **Configure environment**
```bash
# Copy and edit environment files
cp .env.example .env
```

4. **Start services**
```bash
# Using Docker Compose (recommended)
docker-compose up

# Or manually
# Terminal 1: Database
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=kreatives postgres

# Terminal 2: Backend
cd backend && npm run start:dev

# Terminal 3: Frontend
cd frontend && npm run dev
```

5. **Deploy contracts**
```bash
cd contract
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/subscription.wasm \
  --network testnet \
  --source <your-key>
```

## Development Workflow

### Contract Development
```bash
cd contract
cargo test
cargo build --release --target wasm32-unknown-unknown
# Redeploy if needed
```

### Backend Development
```bash
cd backend
npm run test
# Server auto-reloads in dev mode
```

### Frontend Development
```bash
cd frontend
npm run dev
# Next.js auto-reloads
```

## Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository** and clone your fork
2. **Create a branch** for your feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit your changes** with clear, descriptive messages
   ```bash
   git commit -m "feat: add subscription renewal feature"
   ```
6. **Push to your fork** and submit a pull request
   ```bash
   git push origin feature/your-feature-name
   ```

### Contribution Guidelines

#### Code Style
* **TypeScript/JavaScript**: Follow ESLint configuration
* **Rust**: Follow `rustfmt` standards (`cargo fmt`)
* **Commits**: Use conventional commits (feat, fix, docs, style, refactor, test, chore)

#### Pull Request Process
1. Update documentation for any changed functionality
2. Add tests for new features
3. Ensure all tests pass (`npm test` or `cargo test`)
4. Update the README.md if needed
5. Request review from maintainers

#### Areas for Contribution
* **Smart Contracts**: Enhance subscription logic, add new features
* **Backend**: Improve APIs, add indexer features, optimize queries
* **Frontend**: UI/UX improvements, new creator/fan features
* **Documentation**: Improve guides, add examples, fix typos
* **Testing**: Add unit tests, integration tests, e2e tests
* **DevOps**: Improve CI/CD, Docker configurations

### Reporting Issues

Found a bug or have a feature request?

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots if applicable

### Development Setup

#### Environment Variables
See `.env.example` for required configuration:
* `STELLAR_NETWORK`: testnet/mainnet
* `CONTRACT_ADDRESS`: Deployed contract address
* `BACKEND_URL`: Backend API URL
* `JWT_SECRET`: Secret for JWT tokens
* `DATABASE_URL`: PostgreSQL connection string

#### Testing
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Contract tests
cd contract && cargo test

# E2E tests
cd frontend && npm run test:e2e
```

#### Code Review Standards
* Code must pass all CI checks
* At least one maintainer approval required
* All conversations must be resolved
* Branch must be up to date with main

### Community

* **Discord**: [Join our community](#) (coming soon)
* **Twitter**: [@Kreatives](#) (coming soon)
* **Email**: support@kreatives.io

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:
* Be respectful and constructive
* Accept constructive criticism gracefully
* Focus on what's best for the community
* Show empathy towards others

### Recognition

Contributors will be recognized in:
* README.md contributors section
* Release notes for significant contributions
* Community highlights

## Roadmap

### Phase 1: Core Platform (Current)
- [x] Basic project structure
- [ ] Smart contract implementation
- [ ] Backend API development
- [ ] Frontend UI development

### Phase 2: Enhanced Features
- [ ] Multi-tier subscriptions
- [ ] Content encryption
- [ ] Advanced analytics dashboard
- [ ] Mobile app

### Phase 3: Ecosystem Growth
- [ ] Fiat on/off-ramp integration
- [ ] Creator marketplace
- [ ] NFT integration
- [ ] Cross-chain support

## Support

Need help? Reach out:
* **Documentation**: Check our [docs](./docs)
* **Issues**: [GitHub Issues](https://github.com/Hexstar-labs/Kreatives/issues)
* **Email**: support@kreatives.io

## Acknowledgments

Built with inspiration from the open-source community and powered by:
* Stellar blockchain
* Soroban smart contracts
* Next.js and NestJS frameworks

---

**Built with ❤️ by the Kreatives community**