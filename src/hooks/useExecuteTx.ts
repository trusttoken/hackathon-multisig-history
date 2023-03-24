import { SafeMultisigTransactionResponse } from "../types";
import { useSigner } from "@usedapp/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { ethers } from "ethers";
import Safe from "@safe-global/safe-core-sdk";

export const useExecuteTx = (tx: SafeMultisigTransactionResponse) => {
  const signer = useSigner();
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      if (!signer || !tx.data) {
        return undefined
      }
      const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer })
      const safeSdk: Safe = await Safe.create({ethAdapter, safeAddress: tx.safe})
      const safeTransaction = await safeSdk.createTransaction({
        safeTransactionData: {
          to: tx.to,
          data: tx.data,
          baseGas: tx.baseGas,
          gasPrice: Number(tx.gasPrice),
          nonce: tx.nonce,
          gasToken: tx.gasToken,
          safeTxGas: tx.safeTxGas,
          value: tx.value,
          operation: tx.operation,
          refundReceiver: tx.refundReceiver,
        },
      })
      const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
      const txData = await executeTxResponse.transactionResponse?.wait()
      console.log('txData: ', txData)
    },
    onSuccess: () => queryClient.invalidateQueries(["txs", "0x10443C6e07D43ad15D749931379feC963fCb6baD"])
  })
}
