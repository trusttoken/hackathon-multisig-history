import styled, { css } from "styled-components";
import { BorderRadiuses, shadows, Transitions } from "styles";

import Link from "next/link";
import { Column, Row } from "components/general";

export interface TableCellProps {
  children: React.ReactNode;
  colSpan?: number;
  maxWidth?: number;
  side?: "left" | "right" | "center";
  selected?: boolean;
}

export const TableCell = ({
  children,
  colSpan,
  maxWidth,
  side,
  selected,
}: TableCellProps) => (
  <TableCellStyled
    selected={selected}
    maxWidth={maxWidth}
    {...(colSpan ? { colSpan } : {})}
  >
    <CellRow side={side}>{children}</CellRow>
  </TableCellStyled>
);

export const TableCellStyled = styled.td<
  Pick<TableCellProps, "maxWidth" | "selected">
>`
  padding: 0;
  color: inherit;
  background-color: inherit;
  border-bottom: 1px solid
    ${({ theme, selected }) => (selected ? "none" : theme.colors.Mouse)};
  transition: ${Transitions.all};

  &:first-child {
    border-left: 1px solid ${({ theme }) => theme.colors.Mouse};
  }

  &:last-child {
    border-right: 1px solid ${({ theme }) => theme.colors.Mouse};
  }

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth + "px"};
      text-overflow: ellipsis;
    `}
`;

export const TableCellExpanded = styled.td`
  height: 267px;
  color: inherit;
  max-width: 100%;
  background-color: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.colors.Mouse};
  border-left: 1px solid ${({ theme }) => theme.colors.Mouse};
`;

export const CellRow = styled(Row)<Pick<TableCellProps, "side">>`
  height: 108px;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 20px;
  text-align: ${({ side }) => `${side}`};
  border-radius: ${BorderRadiuses.m};
  justify-content: ${({ side }) => {
    switch (side) {
      case "left":
      default:
        return "flex-start";
      case "right":
        return "flex-end";
      case "center":
        return "center";
    }
  }};
`;

export const TableCellColumn = styled(Column)`
  row-gap: 8px;
  width: fit-content;
`;
export const TableCellRow = styled(Row)`
  column-gap: 4px;
  width: fit-content;
`;
