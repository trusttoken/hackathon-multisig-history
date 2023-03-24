import { useBlockNumber, useEthers } from "@usedapp/core";
import { useMemo } from "react";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { ethers } from "ethers";
import SafeServiceClient from "@safe-global/safe-service-client";
import { useQuery } from "@tanstack/react-query";
import { Datatable } from "components/Datatable";
import {
  activityColumn,
  ownerColumn,
  dateColumn,
  approveColumn,
  statusColumn,
  buttonColumn,
} from "components/Datatable/tableColumns";
import { SafeMultisigTransactionResponse } from "types";
import { Content, Text } from "components/general";

export default function History() {
  const {client} = useSafeClient()

  const { data: multisigTxs } = useQuery({
    queryKey: ["txs", "0x10443C6e07D43ad15D749931379feC963fCb6baD"],
    queryFn: async () => {
      return client?.getMultisigTransactions(
        "0x10443C6e07D43ad15D749931379feC963fCb6baD"
      );
    },
  });
  console.log("multisigTxs: ", multisigTxs);
  const results = multisigTxs?.results as
    | SafeMultisigTransactionResponse[]
    | undefined;

  return (
    <Content>
      <Text variant="title2" color="dark" extraBold>
        Transactions
      </Text>
      <Datatable
        initSortKey="Status"
        data={results ?? []}
        columns={[
          activityColumn,
          ownerColumn,
          dateColumn,
          approveColumn,
          statusColumn,
          buttonColumn,
        ]}
      />
    </Content>
  );
}

interface TransactionProps {
  tx: SafeMultisigTransactionResponse;
}
const TransactionRow = ({ tx }: TransactionProps) => {
  const { account, chainId } = useEthers();
  const signer = useSigner()

  const {client} = useSafeClient()

  const { mutate } = useMutation({
    mutationFn: async () => {
      const safeInfo = await client?.getSafeInfo(tx.safe)
      if (!safeInfo || !signer || !tx.data || !tx.refundReceiver) {
        return undefined
      }

      const typedData = generateTypedData({
        safeAddress:tx.safe,
        safeVersion: safeInfo.version,
        chainId: chainId ?? Goerli.chainId,
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
          refundReceiver: tx.refundReceiver
        }})

      const types = {SafeTx: typedData.types.SafeTx}
      const signature = await signer._signTypedData(
        typedData.domain,
        types,
        typedData.message,
      )

      return client?.confirmTransaction(tx.safeTxHash, signature)
    },
  });

  return (
    <div>
      {requiresConfirmation(tx, account) && <button onClick={() => mutate()}>confirm</button>}
      {requiresExecution(tx) && <button>execute</button>}
      <pre key={tx.safeTxHash}>{JSON.stringify(tx)}</pre>
    </div>
  );
};

const requiresConfirmation = (
  tx: SafeMultisigTransactionResponse,
  account: string | undefined
) => {
  const confirmations = tx.confirmations ?? [];

  return (
    account &&
    !tx.isExecuted &&
    confirmations.length < tx.confirmationsRequired &&
    !confirmations.some((confirmation) =>
      addressEqual(account, confirmation.owner)
    )
  );
};

const requiresExecution = (tx: SafeMultisigTransactionResponse) => {
  const confirmations = tx.confirmations ?? [];

  return !tx.isExecuted && confirmations.length >= tx.confirmationsRequired;
};
