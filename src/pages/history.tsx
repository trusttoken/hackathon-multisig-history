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
import { Loading } from "components/Loading";

export default function History() {
  const { client } = useSafeClient();

  const { data: multisigTxs, isLoading } = useQuery({
    queryKey: ["txs", "0x10443C6e07D43ad15D749931379feC963fCb6baD"],
    queryFn: async () => {
      if (!client) {
        throw new Error("Undefined client");
      }
      return client.getMultisigTransactions(
        "0x10443C6e07D43ad15D749931379feC963fCb6baD"
      );
    },
    enabled: client !== undefined,
  });

  if (isLoading || !multisigTxs) {
    return <Loading />;
  }
  const results = multisigTxs?.results as
    | SafeMultisigTransactionResponse[]
    | undefined;

  const filteredResults = results?.filter(
    (result) => result.dataDecoded?.method
  );

  return (
    <Content>
      <Text variant="title2" color="dark" extraBold>
        Transactions
      </Text>
      <Datatable
        initSortKey="Status"
        data={filteredResults ?? []}
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
