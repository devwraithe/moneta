import { Commitment } from "@solana/web3.js";

export const tokenMetadata = {
  name: "Devwraithe",
  symbol: "DVWRT",
  uri: "https://raw.githubusercontent.com/devwraithe/token-assets/refs/heads/main/metadata.json",
};

export const filePath = "./src/mint_authority.json";
export const rpcUrl: string = "https://api.devnet.solana.com";
export const commitment: Commitment = "confirmed";
