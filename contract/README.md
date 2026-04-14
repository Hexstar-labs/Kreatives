# Kreatives Soroban Contracts

Smart contracts for Kreatives on Stellar/Soroban.

## Contracts

1. **subscription** - Core subscription lifecycle management

## Prerequisites

* Rust stable
* `stellar-cli` installed:

```bash
cargo install --locked stellar-cli
```

## Build

```bash
cargo build --target wasm32-unknown-unknown --release
```

## Test

```bash
cargo test
```

## Deploy

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/subscription.wasm \
  --network testnet \
  --source <your-key>
```

## Contract Interface

### Subscription Contract

#### `init(admin, protocol_fee_bps, fee_recipient)`
Initialize the contract with admin and fee structure.

#### `create_plan(creator, asset, amount, interval_days) -> u32`
Create a subscription plan. Returns plan ID.

#### `is_subscriber(fan, creator) -> bool`
Check if a fan is subscribed to a creator.

#### `version() -> u32`
Get contract version.

## Development Status

This is a minimal implementation (10% of full functionality) demonstrating:
- Contract initialization
- Plan creation
- Basic subscription checking
- Testing infrastructure

Full implementation would include:
- Subscribe/renew/cancel functions
- Payment processing with fee splits
- Multi-asset support
- Event emissions
- Expiry tracking
- Access control tiers
