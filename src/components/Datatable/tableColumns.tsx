import { TableColumn } from "./types";
import { formatDate, shortAddress } from "utils";
import { Text } from "../general/Text";
import styled from "styled-components";
import { TableCellColumn, TableCellRow } from "./TableCell";
import { Badge } from "../Badge";
import { Icon } from "components/Icon";
import { Row, TextInline } from "components/general";
import { defaultImage, Img } from "components/Image";
import { SafeMultisigTransactionResponse } from "types";
import { ActionButton } from "../Action/ActionButton";

type TransactionColumn = TableColumn<SafeMultisigTransactionResponse>;

export const activityColumn: TransactionColumn = {
  name: "Activity",
  selector: ({ dataDecoded }) => dataDecoded?.method ?? "",
  cell: ({ dataDecoded }) => (
    <TableCellRow>
      <Icon>download</Icon>
      <Text variant="body2" bold color="dark">
        {dataDecoded?.method}
      </Text>
    </TableCellRow>
  ),
};

export const ownerColumn: TransactionColumn = {
  name: "Executed by",
  selector: ({ safe }) => safe,
  cell: ({ safe }) => (
    <TableCellRow>
      <Img image={defaultImage} size={24} />
      <ManagerName>{shortAddress(safe, 6, 4)}</ManagerName>
    </TableCellRow>
  ),
};

export const dateColumn: TransactionColumn = {
  name: "Date",
  selector: ({ submissionDate }) => submissionDate,
  cell: ({ submissionDate }) => (
    <StatusCellColumn>
      <Text color="dark" variant="body2">
        {formatDate(submissionDate)}
      </Text>
    </StatusCellColumn>
  ),
  side: "right",
};

export const approveColumn: TransactionColumn = {
  name: "Approvals",
  selector: ({ confirmationsRequired }) => confirmationsRequired,
  cell: (transaction) => (
    <TableCellRow>
      <Icon>group</Icon>
      <Row>
        <TextInline>{transaction.confirmationsRequired}/</TextInline>
        <TextInline>{transaction.confirmations?.length}</TextInline>
      </Row>
    </TableCellRow>
  ),
  side: "right",
};

export const statusColumn: TransactionColumn = {
  name: "Status",
  selector: ({ confirmationsRequired }) => confirmationsRequired,
  cell: (transaction) => <Badge>{transaction.confirmationsRequired}</Badge>,
  side: "right",
};

export const buttonColumn: TransactionColumn = {
  name: "Action",
  selector: ({ confirmationsRequired }) => confirmationsRequired,
  cell: (transaction) => <ActionButton tx={transaction}></ActionButton>,
};

const StatusCellColumn = styled(TableCellColumn)`
  align-items: flex-end;
`;

const ManagerName = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.OxidizedGreen};
  }
`;
