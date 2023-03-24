import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateTypedData } from "@safe-global/safe-core-sdk-utils";
import { Goerli, useEthers, useSigner } from "@usedapp/core";
import { useSafeClient } from "../pages/providers/SafeProvider/context";
import { SafeMultisigTransactionResponse } from "types";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { ethers } from "ethers";
import Safe from "@safe-global/safe-core-sdk";

export const useConfirmTx = (tx: SafeMultisigTransactionResponse) => {
  const { chainId = Goerli.chainId } = useEthers();
  const { client } = useSafeClient();
  const signer = useSigner();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const safeInfo = await client?.getSafeInfo(tx.safe);
      if (!safeInfo || !signer || !tx.data || !tx.refundReceiver) {
        return undefined;
      }

      const typedData = generateTypedData({
        safeAddress: tx.safe,
        safeVersion: safeInfo.version,
        chainId: chainId,
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
      });

      const types = { SafeTx: typedData.types.SafeTx };
      const signature = await signer._signTypedData(
        typedData.domain,
        types,
        typedData.message
      );

      if (!signer || !tx.data) {
        return undefined;
      }
      return client?.confirmTransaction(tx.safeTxHash, signature);
    },
    onSuccess: () =>
      queryClient.invalidateQueries([
        "txs",
        "0x10443C6e07D43ad15D749931379feC963fCb6baD",
      ]),
  });
};
