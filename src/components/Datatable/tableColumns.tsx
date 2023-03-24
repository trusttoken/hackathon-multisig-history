import { TableColumn } from "./types";
import { shortAddress, formatDate, formatTime } from "utils";
import { Text } from "../general/Text";
import styled from "styled-components";
import { TableCellColumn, TableCellRow } from "./TableCell";
import { Badge, StatusBadge } from "../Badge";
import { Icon } from "components/Icons";
import { Row, TextInline } from "components/general";
import { defaultImage, Img } from "components/Image";
import { SafeMultisigTransactionResponse } from "types";
import { theme } from "styles";
import { ActionButton } from "../Action/ActionButton";

type TransactionColumn = TableColumn<SafeMultisigTransactionResponse>;

export const activityColumn: TransactionColumn = {
  name: "Activity",
  selector: ({ dataDecoded }) => dataDecoded?.method ?? "",
  cell: ({ dataDecoded }) => (
    <TableCellRow>
      <Icon color={theme.colors.CopperOrange}>download</Icon>
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
      <Text color="light" variant="body2">
        {formatTime(submissionDate)}
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
        <TextInline color="light" variant="body2">
          {transaction.confirmations?.length}
        </TextInline>
        <TextInline variant="body2">
          /{transaction.confirmationsRequired}
        </TextInline>
      </Row>
    </TableCellRow>
  ),
  side: "right",
};

export const statusColumn: TransactionColumn = {
  name: "Status",
  selector: ({ confirmationsRequired }) => confirmationsRequired,
  cell: (transaction) => (
    <StatusBadge
      confirmationsGets={transaction.confirmations?.length ?? 0}
      confirmationsRequired={transaction.confirmationsRequired}
    />
  ),
  side: "center",
};

export const buttonColumn: TransactionColumn = {
  name: "Action",
  selector: ({ confirmationsRequired }) => confirmationsRequired,
  cell: (transaction) => <ActionButton tx={transaction}></ActionButton>,
  side: "center",
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
