# Moneta

**Create, customize, and mint SPL tokens on Solana.**

Moneta is a straightforward toolkit for minting SPL tokens. Named after the Roman goddess of money and mints, Moneta lets you create token mints, add metadata, and mint tokens with simple commands. All on the Devnet.

## Features

- Create new SPL token mints
- Add metadata (name, symbol, description, image)
- Mint tokens to any wallet
- Simple command-line interface

## Setup

### Prerequisites

- Node.js (v16+)
- Yarn
- Solana CLI
- A funded Solana wallet

### Installation
```bash
git clone https://github.com/devwraithe/moneta.git
cd moneta
yarn install
```

## Usage

### 1. Create a Mint
```bash
yarn create-mint
```

Creates a new token mint and returns the mint address.

### 2. Add Metadata
```bash
yarn add-metadata
```

Adds name, symbol, description, and image to your mint.

### 3. Mint Tokens
```bash
yarn mint-tokens
```

Mints tokens to a specified wallet address (ATA created automatically).

## Example
```bash
yarn create-mint
# > Token mint created: EJ3oZpi9BRZDutANxzWkWVLXkSB9r9NnbKAaTKGATWqv

yarn add-metadata
# Enter mint address: EJ3oZpi9BRZDutANxzWkWVLXkSB9r9NnbKAaTKGATWqv
# > Txn signature: ...

yarn mint-tokens
# Enter mint address: EJ3oZpi9BRZDutANxzWkWVLXkSB9r9NnbKAaTKGATWqv
# Enter wallet address: ...
# > Minted 125_000 tokens to WALLET_ADDRESS
```

## Security

⚠️ Never commit your `mint_authority.json` file or share your private keys.

## License

MIT

---

*In cryptography we trust, in Moneta we forge.*
