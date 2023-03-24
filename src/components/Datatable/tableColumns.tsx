import { TableColumn } from "./types";
import { shortAddress, formatDate } from "utils";
import { Text } from "../general/Text";
import styled from "styled-components";
import { TableCellColumn } from "./TableCell";
import { Badge } from "../Badge";
import { Icon } from "components/Icon";
import { Row, TextInline } from "components/general";
import { Img, defaultImage } from "components/Image";
import { Button } from "components/Button";
import { SafeMultisigTransactionResponse } from "types";

type TransactionColumn = TableColumn<SafeMultisigTransactionResponse>;

export const activityColumn: TransactionColumn = {
  name: "Activity",
  selector: ({ dataDecoded }) => dataDecoded?.method ?? "",
  cell: ({ dataDecoded }) => (
    <Row>
      <Icon>download</Icon>
      <Text variant="body2" bold color="dark">
        {dataDecoded?.method}
      </Text>
    </Row>
  ),
};

export const ownerColumn: TransactionColumn = {
  name: "Executed by",
  selector: ({ safe }) => safe,
  cell: ({ safe }) => (
    <TableCellColumn>
      <Img image={defaultImage} size={24} />
      <ManagerName>{shortAddress(safe)}</ManagerName>
    </TableCellColumn>
  ),
};

export const dateColumn: TransactionColumn = {
  name: "Date",
  selector: ({ submissionDate }) => submissionDate,
  cell: ({ submissionDate }) => (
    <Text color="dark" variant="body2">
      {formatDate(submissionDate)}
    </Text>
  ),
  side: "right",
};

export const approveColumn: TransactionColumn = {
  name: "Approvals",
  selector: ({ confirmationsRequired }) => confirmationsRequired,
  cell: (transaction) => (
    <StatusCellColumn>
      <Icon>group</Icon>
      <Row>
        <TextInline>{transaction.confirmationsRequired}/</TextInline>
        <TextInline>{transaction.confirmations?.length}</TextInline>
      </Row>
    </StatusCellColumn>
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
  name: "Manager",
  selector: ({ confirmationsRequired }) => confirmationsRequired,
  cell: (transaction) => <Button>{transaction.confirmationsRequired}</Button>,
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
