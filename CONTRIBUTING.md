# Contributing to Kreatives

Thank you for your interest in contributing to Kreatives! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

* Be respectful and constructive
* Accept constructive criticism gracefully
* Focus on what's best for the community
* Show empathy towards others
* Avoid discriminatory or offensive language

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Kreatives.git
   cd Kreatives
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Hexstar-labs/Kreatives.git
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Setting Up Development Environment

Follow the setup instructions in the main [README.md](README.md#getting-started) to set up your development environment.

### Making Changes

1. **Keep your fork synced**:
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes** in your feature branch

3. **Test your changes** thoroughly:
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test
   
   # Contract tests
   cd contract && cargo test
   ```

4. **Commit your changes** with clear messages (see [Commit Guidelines](#commit-guidelines))

## Coding Standards

### TypeScript/JavaScript (Frontend & Backend)

* Use TypeScript for type safety
* Follow ESLint configuration
* Use meaningful variable and function names
* Add JSDoc comments for public APIs
* Keep functions small and focused
* Use async/await over promises

Example:
```typescript
/**
 * Check if a fan is subscribed to a creator
 * @param fan - Fan's Stellar address
 * @param creator - Creator's Stellar address
 * @returns Promise resolving to subscription status
 */
async checkSubscription(fan: string, creator: string): Promise<boolean> {
  // Implementation
}
```

### Rust (Smart Contracts)

* Follow `rustfmt` standards: `cargo fmt`
* Run `cargo clippy` and fix warnings
* Add documentation comments for public functions
* Write unit tests for all contract functions
* Keep contract functions simple and gas-efficient

Example:
```rust
/// Check if a fan is subscribed to a creator
/// 
/// # Arguments
/// * `env` - Contract environment
/// * `fan` - Fan's address
/// * `creator` - Creator's address
/// 
/// # Returns
/// Boolean indicating subscription status
pub fn is_subscriber(env: Env, fan: Address, creator: Address) -> bool {
    // Implementation
}
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation changes
* `style`: Code style changes (formatting, etc.)
* `refactor`: Code refactoring
* `test`: Adding or updating tests
* `chore`: Maintenance tasks

### Examples

```bash
feat(contract): add subscription renewal function

Implement the renew() function to allow subscribers to extend
their subscription period.

Closes #123
```

```bash
fix(backend): correct subscription expiry check

The expiry check was comparing timestamps incorrectly,
causing false positives.
```

## Pull Request Process

1. **Update documentation** for any changed functionality

2. **Add tests** for new features

3. **Ensure all tests pass**:
   ```bash
   npm test  # Backend/Frontend
   cargo test  # Contracts
   ```

4. **Update README.md** if needed

5. **Create a Pull Request** with:
   - Clear title describing the change
   - Detailed description of what and why
   - Reference to related issues
   - Screenshots for UI changes

6. **Request review** from maintainers

7. **Address feedback** and make requested changes

8. **Wait for approval** - at least one maintainer must approve

### PR Title Format

Follow the same format as commit messages:

```
feat(frontend): add creator dashboard
fix(contract): resolve subscription expiry bug
docs: update contribution guidelines
```

## Testing

### Backend Tests

```bash
cd backend
npm test
npm run test:cov  # With coverage
```

### Frontend Tests

```bash
cd frontend
npm test
npm run test:e2e  # End-to-end tests
```

### Contract Tests

```bash
cd contract
cargo test
cargo test -- --nocapture  # With output
```

### Writing Tests

* Write tests for all new features
* Maintain or improve code coverage
* Test edge cases and error conditions
* Use descriptive test names

Example:
```typescript
describe('SubscriptionService', () => {
  it('should return true for active subscription', async () => {
    // Test implementation
  });
  
  it('should return false for expired subscription', async () => {
    // Test implementation
  });
});
```

## Documentation

### Code Documentation

* Add JSDoc/RustDoc comments for public APIs
* Explain complex logic with inline comments
* Keep comments up-to-date with code changes

### README Updates

Update relevant README files when:
* Adding new features
* Changing configuration
* Modifying setup process
* Adding dependencies

### API Documentation

Document API endpoints with:
* Endpoint path and method
* Request parameters
* Response format
* Example usage
* Error codes

## Areas for Contribution

### Smart Contracts
- Implement subscription renewal logic
- Add multi-tier subscription support
- Optimize gas usage
- Add event emissions
- Improve access control

### Backend
- Implement event indexer
- Add IPFS integration
- Create analytics endpoints
- Improve error handling
- Add rate limiting

### Frontend
- Build creator dashboard
- Implement subscription flows
- Add content browsing
- Improve mobile responsiveness
- Add loading states and error handling

### Documentation
- Improve setup guides
- Add code examples
- Create video tutorials
- Translate documentation
- Fix typos and clarity

### Testing
- Add unit tests
- Create integration tests
- Write e2e tests
- Improve test coverage
- Add performance tests

### DevOps
- Improve CI/CD pipeline
- Add deployment scripts
- Optimize Docker images
- Add monitoring
- Improve logging

## Questions?

If you have questions:
* Check existing documentation
* Search closed issues
* Ask in discussions (coming soon)
* Email: support@kreatives.io

## Recognition

Contributors will be recognized in:
* README.md contributors section
* Release notes
* Community highlights

Thank you for contributing to Kreatives! 🎉
