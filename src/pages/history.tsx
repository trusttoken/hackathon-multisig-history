import { useQuery } from "@tanstack/react-query";
import { Datatable } from "components/Datatable";
import {
  activityColumn,
  approveColumn,
  buttonColumn,
  dateColumn,
  ownerColumn,
  statusColumn,
} from "components/Datatable/tableColumns";
import { SafeMultisigTransactionResponse } from "types";
import { Content, Text } from "components/general";
import { useSafeClient } from "pages/providers/SafeProvider/context";

export default function History() {
  const { client } = useSafeClient();

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
