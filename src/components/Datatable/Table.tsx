import { Column } from "components/general";
import styled from "styled-components";
import { BorderRadiuses, shadows, zIndexes } from "styles";
import { TableCellStyled } from "./TableCell";

export const TableContainer = styled.div`
  width: 100%;
  position: relative;
  min-width: 100%;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme: { colors } }) =>
    `${colors.Iron} ${colors.Mouse}`};

  &::-webkit-scrollbar {
    display: block;
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.Mouse};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.Iron};
  }
`;

export const Table = styled.table`
  width: 70%;
  max-width: 100%;
  border-spacing: initial;
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: ${BorderRadiuses.s};
  border-collapse: collapse;
`;

export const TableBody = styled.tbody`
  max-width: 100%;
  overflow: hidden;
`;

export interface TableRowProps {
  disableShadow?: boolean;
}

export const TableRow = styled.tr<TableRowProps>`
  position: relative;
  max-width: 100%;
  height: 108px;
  background-color: ${({ theme }) => theme.colors.White};
  cursor: pointer;

  &:last-child {
    ${TableCellStyled}:first-child {
      border-radius: 0px 0px 0px ${BorderRadiuses.s};
    }
    ${TableCellStyled}:last-child {
      border-radius: 0px 0px ${BorderRadiuses.s} 0px;
    }
  }

  ${({ disableShadow }) =>
    !disableShadow &&
    `
    &:hover {
      z-index: ${zIndexes.content};
    }
  `}

  &:hover {
    box-shadow: ${({ disableShadow }) => (disableShadow ? "none" : shadows.s)};
  }
`;

export const TableRowExpanded = styled.tr`
  position: relative;
  background-color: ${({ theme }) => theme.colors.White};
`;

export const TableWrapper = styled(Column)`
  row-gap: 16px;
`;
