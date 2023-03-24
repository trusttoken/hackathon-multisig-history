import { ReactNode } from "react";
import styled from "styled-components";
import { Transitions } from "styles";
import { Button } from "../Button";
import { Icon } from "components/Icon";

interface TableHeaderSortButtonProps {
  onClick: () => void;
  isSorting: boolean;
  descending: boolean;
  children: ReactNode;
}

export const TableSortButton = ({
  onClick,
  isSorting,
  descending,
  children,
}: TableHeaderSortButtonProps) => {
  return (
    <TableHeaderSortButton onClick={onClick} isSorting={isSorting}>
      {children}
      <IconWrapper isSorting={isSorting && !descending}>
        <Icon size={16}>expand_more</Icon>
      </IconWrapper>
    </TableHeaderSortButton>
  );
};

const TableHeaderSortButton = styled(Button)<
  Pick<TableHeaderSortButtonProps, "isSorting">
>`
  height: 24px;
  min-width: fit-content;
  justify-content: flex-start;
  column-gap: 4px;
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  transition: ${Transitions.all};
  color: ${({ isSorting, theme }) =>
    isSorting ? theme.colors.CopperOrange : "inherit"};

  &:hover {
    text-decoration: none;
  }
`;
const IconWrapper = styled.div<Pick<TableHeaderSortButtonProps, "isSorting">>`
  & span {
    transform: ${({ isSorting }) =>
      isSorting ? "rotate(180deg) translateY(-2px)" : "translateY(2px)"};
  }
`;
