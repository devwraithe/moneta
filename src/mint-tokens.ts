import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { commitment, rpcUrl, filePath } from "./utilities";
import * as fs from "fs";
import promptSync from "prompt-sync";

const connection: Connection = new Connection(rpcUrl, commitment);

async function mintTokens() {
  try {
    const prompt = promptSync();

    const walletJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const walletArray = new Uint8Array(walletJson);
    const mintAuthority = Keypair.fromSecretKey(walletArray);

    const mintAddress: string = prompt("Enter mint address: ");
    const walletAddress: string = prompt("Enter wallet address: ");
    const mintPubkey = new PublicKey(mintAddress);
    const walletPubkey = new PublicKey(walletAddress);

    const aTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection, // connection
      mintAuthority, // payer
      mintPubkey, // mint
      walletPubkey // owner
    );

    const mintAmount = 125_000;
    const txnSig = await mintTo(
      connection,
      mintAuthority,
      mintPubkey,
      aTokenAccount.address,
      mintAuthority.publicKey,
      mintAmount
    );
    console.log(`Minted ${mintAmount} tokens to ${aTokenAccount.address}`);
    console.log("Txn Signature:", txnSig);
  } catch (e) {
    console.log("Error minting tokens to associated token account:", e);
    throw e;
  }
}

// main
(async () => {
  mintTokens();
})();
