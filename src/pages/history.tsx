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
  const blockNumber = useBlockNumber();
  const { library } = useEthers();

  const serviceClient = useMemo(() => {
    if (library === undefined) {
      return undefined;
    }
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: library,
    });

    return new SafeServiceClient({
      txServiceUrl: "https://safe-transaction-goerli.safe.global",
      ethAdapter,
    });
  }, [library]);

  const { data: safes } = useQuery({
    queryKey: ["safes", blockNumber],
    queryFn: async () => {
      return serviceClient?.getSafesByOwner(
        "0xe13610d0a3e4303c70791773C5DF8Bb16de185d1"
      );
    },
  });

  const { data: multisigTxs } = useQuery({
    queryKey: ["txs", "0x10443C6e07D43ad15D749931379feC963fCb6baD"],
    queryFn: async () => {
      return serviceClient?.getMultisigTransactions(
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
