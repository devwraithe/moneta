import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { createMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import * as fs from "fs";
import { filePath, rpcUrl } from "./utilities";

const commitment: Commitment = "confirmed";
const connection: Connection = new Connection(rpcUrl, commitment);

function getOrCreateMintAuthority(): Keypair {
  if (fs.existsSync(filePath)) {
    const secretKeyArray = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));
  } else {
    const keypair = Keypair.generate();
    fs.writeFileSync(filePath, JSON.stringify(Array.from(keypair.secretKey)));
    console.log("Created new mint authority at:", filePath);
    return keypair;
  }
}

async function createTokenMint(mintAuthority: Keypair): Promise<PublicKey> {
  try {
    // Fails most of the time, might have to go manual
    // await connection.requestAirdrop(mintAuthority.publicKey, 1e9); // 1 SOL

    const mintAccount = Keypair.generate();
    let mintPubkey = await createMint(
      connection,
      mintAuthority, // signer
      mintAuthority.publicKey, // mint authority
      mintAuthority.publicKey, // freeze authority
      6, // decimals
      mintAccount, // mint keypair
      {
        commitment: commitment,
      },
      TOKEN_PROGRAM_ID
    );
    console.log("> Token mint created:", mintPubkey.toBase58());
    return mintPubkey;
  } catch (e) {
    console.log("> Error creating token mint:", e);
    throw e;
  }
}

(async () => {
  const mintAuthority = getOrCreateMintAuthority();
  console.log("Mint authority:", mintAuthority.publicKey.toBase58());
  await createTokenMint(mintAuthority);
  console.log("> Create mint done!");
})();
