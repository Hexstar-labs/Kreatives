#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contracttype]
#[derive(Clone)]
pub struct Plan {
    pub creator: Address,
    pub asset: Address,
    pub amount: i128,
    pub interval_days: u32,
}

#[contracttype]
#[derive(Clone)]
pub struct Subscription {
    pub fan: Address,
    pub plan_id: u32,
    pub expires_at: u64,
    pub active: bool,
}

#[contract]
pub struct SubscriptionContract;

#[contractimpl]
impl SubscriptionContract {
    /// Initialize the contract with admin and protocol fee
    pub fn init(env: Env, admin: Address, protocol_fee_bps: u32, fee_recipient: Address) {
        admin.require_auth();
        env.storage().instance().set(&symbol_short!("admin"), &admin);
        env.storage().instance().set(&symbol_short!("fee_bps"), &protocol_fee_bps);
        env.storage().instance().set(&symbol_short!("fee_rcpt"), &fee_recipient);
    }

    /// Create a subscription plan
    pub fn create_plan(
        env: Env,
        creator: Address,
        asset: Address,
        amount: i128,
        interval_days: u32,
    ) -> u32 {
        creator.require_auth();
        
        let plan_id: u32 = env.storage().instance().get(&symbol_short!("plan_cnt")).unwrap_or(0);
        let next_id = plan_id + 1;
        
        let plan = Plan {
            creator,
            asset,
            amount,
            interval_days,
        };
        
        env.storage().instance().set(&(symbol_short!("plan"), plan_id), &plan);
        env.storage().instance().set(&symbol_short!("plan_cnt"), &next_id);
        
        plan_id
    }

    /// Check if a fan is subscribed to a creator
    pub fn is_subscriber(env: Env, fan: Address, creator: Address) -> bool {
        // Simplified check - in full implementation would check expiry
        env.storage()
            .instance()
            .get::<_, bool>(&(symbol_short!("sub"), fan, creator))
            .unwrap_or(false)
    }

    /// Get contract version
    pub fn version() -> u32 {
        1
    }
}

mod test;
