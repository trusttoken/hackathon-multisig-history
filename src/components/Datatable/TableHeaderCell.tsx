import { Row } from "components/general";
import styled from "styled-components";
import { BorderRadiuses } from "styles";

interface TableHeaderCellProps {
  children?: React.ReactNode;
  colspan?: number;
  className?: string;
  onClick?: () => void;
  side?: "left" | "right" | "center";
}

export const TableHeaderCell = ({
  children,
  colspan,
  className,
  onClick,
  side,
}: TableHeaderCellProps) => (
  <TableHeaderCellStyled
    colSpan={colspan}
    className={className}
    onClick={onClick}
  >
    <HeaderCellRow side={side}>{children}</HeaderCellRow>
  </TableHeaderCellStyled>
);

const TableHeaderCellStyled = styled.th`
  height: 40px;
  padding: 8px 8px 8px 16px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.Corduroy};
  border-top: 1px solid ${({ theme }) => theme.colors.Mouse};
  border-bottom: 1px solid ${({ theme }) => theme.colors.Mouse};
  background-color: ${({ theme }) => theme.colors.White};

  &:first-child {
    border-left: 1px solid ${({ theme }) => theme.colors.Mouse};
    border-radius: ${BorderRadiuses.s} 0px 0px 0px;
  }

  &:last-child {
    border-right: 1px solid ${({ theme }) => theme.colors.Mouse};
    border-radius: 0px ${BorderRadiuses.s} 0px 0px;
  }
`;
const HeaderCellRow = styled(Row)<Pick<TableHeaderCellProps, "side">>`
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
