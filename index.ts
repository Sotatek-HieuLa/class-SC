import { ethers } from "ethers";
import dotenv from "dotenv";
import { TransactionRequest } from "@ethersproject/abstract-provider";

dotenv.config();

(async () => {
  let provider = ethers.getDefaultProvider(process.env.NETWORK);
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  let receiverAddress = "0xc5ef5A9Dc33cF0215719FCFb656f025Fd676a5E5";
  let amountInEther = "0.01";

  let tx: TransactionRequest = {
    from: process.env.ADDRESS,
    to: receiverAddress,
    value: ethers.utils.parseEther(amountInEther),
    nonce: await provider.getTransactionCount(process.env.ADDRESS, "latest"),
    gasLimit: ethers.utils.hexlify(100000), // 100000
    gasPrice: await provider.getGasPrice(),
  };
  
  const res = await wallet.sendTransaction(tx);

  console.log(res);
})();
