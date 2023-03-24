import { Button } from "../Button";
import { SafeMultisigTransactionResponse } from "../../types";
import { addressEqual, useEthers } from "@usedapp/core";
import { useConfirmTx } from "hooks/useConfirmTx";
import { Text } from "../general";
import { useExecuteTx } from "../../hooks/useExecuteTx";

interface ActionButtonProps {
  tx: SafeMultisigTransactionResponse;
}

export const ActionButton = ({ tx }: ActionButtonProps) => {
  const { account } = useEthers();
  const confirmations = tx.confirmations ?? [];
  const { mutate: confirmTx } = useConfirmTx(tx);
  const { mutate: executeTx } = useExecuteTx(tx);

  if (requiresExecution(tx)) {
    return (
      <Button view="primary" onClick={executeTx}>
        Execute
      </Button>
    );
  }

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
      <Button view="secondary" onClick={confirmTx}>
        Approve
      </Button>
    );
  }

  return null;
};

const requiresConfirmation = (
  tx: SafeMultisigTransactionResponse,
  account: string | undefined
) => {
  // return true
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
  if (tx.isExecuted || tx.isSuccessful) {
    return false;
  }

  return confirmations.length >= tx.confirmationsRequired;
};
