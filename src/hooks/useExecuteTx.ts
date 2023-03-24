import { SafeMultisigTransactionResponse } from "../types";
import { useSigner } from "@usedapp/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { ethers } from "ethers";
import Safe from "@safe-global/safe-core-sdk";
import { useSafeClient } from "../pages/providers/SafeProvider/context";

export const useExecuteTx = (tx: SafeMultisigTransactionResponse) => {
  const signer = useSigner();
  const queryClient = useQueryClient();
  const { client } = useSafeClient();

  return useMutation({
    mutationFn: async () => {
      if (!client || !signer || !tx.data) {
        return undefined;
      }
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      const safeSdk: Safe = await Safe.create({
        ethAdapter,
        safeAddress: tx.safe,
      });

      const newTx = await client.getTransaction(tx.safeTxHash);

      const executeTxResponse = await safeSdk.executeTransaction(newTx);
      console.log("executeTxResponse: ", executeTxResponse);
      const txData = await executeTxResponse.transactionResponse?.wait();
      console.log("txData: ", txData);
    },
    onSuccess: () =>
      queryClient.invalidateQueries([
        "txs",
        "0x10443C6e07D43ad15D749931379feC963fCb6baD",
      ]),
  });
};
