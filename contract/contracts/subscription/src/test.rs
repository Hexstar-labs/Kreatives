#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_init() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SubscriptionContract);
    let client = SubscriptionContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let fee_recipient = Address::generate(&env);
    
    client.init(&admin, &500, &fee_recipient);
}

#[test]
fn test_create_plan() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SubscriptionContract);
    let client = SubscriptionContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    let creator = Address::generate(&env);
    let asset = Address::generate(&env);
    let fee_recipient = Address::generate(&env);
    
    client.init(&admin, &500, &fee_recipient);
    
    let plan_id = client.create_plan(&creator, &asset, &10_000_000, &30);
    assert_eq!(plan_id, 0);
}

#[test]
fn test_version() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SubscriptionContract);
    let client = SubscriptionContractClient::new(&env, &contract_id);
    
    assert_eq!(client.version(), 1);
}
