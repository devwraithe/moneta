# Moneta Mint

Moneta is a simple, easy-to-use toolkit for creating **SPL tokens** on the **Solana Devnet**. Named after _Moneta_, the Roman goddess of money and mints, it helps you quickly go from idea to token in just a few steps. With Moneta, you can **create a new token mint**, **add custom metadata** like name and symbol, and **mint tokens** to any wallet — all without needing deep Solana knowledge. Whether you’re learning, testing, or building your next big idea, Moneta makes token creation fast and approachable.

## Token Mint Screenshot and Hash


![Token Info](./docs/dvrt-token.png)

> **Token Hash:**
> `Fdw8FEek786AZhg4PSSm7nsgHCCu3MsorVhXgMeWZY9a`

[View on Solana Explorer](https://explorer.solana.com/address/Fdw8FEek786AZhg4PSSm7nsgHCCu3MsorVhXgMeWZY9a?cluster=devnet)

## Setup & Usage

1. Clone the repository:

```bash
git clone https://github.com/devwraithe/moneta.git
cd moneta
yarn install
```

2. Create a mint

```bash
yarn create-mint
```

3. Add metadata

```bash
yarn add-metadata
```

4. Mint tokens

```bash
yarn mint-tokens
```

## Security

> [!IMPORTANT]
> **Never commit your `mint_authority.json` file or share your private keys.**

_In cryptography we trust, in Moneta we forge._
