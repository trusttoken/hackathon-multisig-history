import { Button } from "../Button";
import { SafeMultisigTransactionResponse } from "../../types";
import { addressEqual, useEthers } from "@usedapp/core";
import { useConfirmTx } from "hooks/useConfirmTx";
import { Text } from "../general";

interface ActionButtonProps {
  tx: SafeMultisigTransactionResponse;
}

export const ActionButton = ({ tx }: ActionButtonProps) => {
  const { account } = useEthers();
  const confirmations = tx.confirmations ?? [];
  const { mutate } = useConfirmTx(tx);

  const hasUserConfirmed =
    account &&
    confirmations.some((confirmation) =>
      addressEqual(account, confirmation.owner)
    );

  if (hasUserConfirmed) {
    return <Text>You approved</Text>;
  }

  if (requiresConfirmation(tx, account)) {
    return (
      <Button view="secondary" onClick={mutate}>
        Approve
      </Button>
    );
  }

  if (requiresExecution(tx)) {
    return <Button view="primary">Execute</Button>;
  }

  return null;
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
