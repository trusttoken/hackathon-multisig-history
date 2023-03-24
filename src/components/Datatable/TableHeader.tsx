import styled, { css } from "styled-components";
import { zIndexes } from "styles";

interface TableHeaderProps {
  children: React.ReactNode;
  isSticky?: boolean;
}

export const TableHeader = ({ children, isSticky }: TableHeaderProps) => (
  <TableHeaderHead isSticky={isSticky}>
    <tr>{children}</tr>
  </TableHeaderHead>
);

const TableHeaderHead = styled.thead<Pick<TableHeaderProps, "isSticky">>`
  text-align: left;

  ${({ isSticky }) =>
    isSticky &&
    css`
      position: sticky;
      top: 0;
      z-index: ${zIndexes.aboveContent};
    `}
`;
