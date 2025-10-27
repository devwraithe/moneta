import { tokenMetadata, filePath, rpcUrl } from "./utilities";
import {
  createV1,
  findMetadataPda,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  keypairIdentity,
  percentAmount,
  publicKey,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import * as fs from "fs";
import promptSync from "prompt-sync";

async function addMetadata() {
  const prompt = promptSync();
  const mintAddress: string = prompt("Enter mint address: ");
  const mint = publicKey(mintAddress);

  const umi = createUmi(rpcUrl).use(mplTokenMetadata()).use(mplToolbox());
  const walletJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const walletArray = new Uint8Array(walletJson);
  const walletKeypair = umi.eddsa.createKeypairFromSecretKey(walletArray);
  umi.use(keypairIdentity(walletKeypair));

  console.log("Mint address:", mint);

  const metadataAccountAddress = await findMetadataPda(umi, {
    mint: mint,
  });

  const txn = await createV1(umi, {
    mint,
    authority: umi.identity,
    payer: umi.identity,
    updateAuthority: umi.identity,
    metadata: metadataAccountAddress,
    name: tokenMetadata.name,
    symbol: tokenMetadata.symbol,
    uri: tokenMetadata.uri,
    sellerFeeBasisPoints: percentAmount(5.5), // 5.5%
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);

  let txnSig = base58.deserialize(txn.signature);
  console.log(`Txn signature ${txnSig[0]}`);
}

(async () => {
  addMetadata();
})();
