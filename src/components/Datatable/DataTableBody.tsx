import { TableBody, TableRow, TableRowExpanded } from "./Table";
import { Fragment, ReactNode } from "react";
import styled from "styled-components";
import { TableColumn } from "./types";
import { TableCell, TableCellExpanded } from "./TableCell";

interface Props<Row> {
  columns: TableColumn<Row>[];
  data: Row[];
  isRowSelected?: (row: Row) => boolean;
  expandingNode?: ReactNode;
}

export function DataTableBody<Row>({
  columns,
  data,
  isRowSelected,
  expandingNode,
}: Props<Row>) {
  const isSelected = (row: Row) =>
    !!(isRowSelected && expandingNode && isRowSelected(row));

  return (
    <TableBody>
      {data.map((row, i) => (
        <Fragment key={i}>
          <TableRow
            disableShadow={isSelected(row)}
            // onClick={() => console.log("click!")}
          >
            {columns.map(({ cell, selector, side }, j) => (
              <TableCell side={side} key={j} selected={isSelected(row)}>
                {cell ? cell(row) : selector(row).toString()}
              </TableCell>
            ))}
          </TableRow>
          {isSelected(row) && (
            <TableRowExpanded>
              <TableCellExpanded colSpan={columns.length}>
                <ExpandingNodeWrapper>{expandingNode}</ExpandingNodeWrapper>
              </TableCellExpanded>
            </TableRowExpanded>
          )}
        </Fragment>
      ))}
    </TableBody>
  );
}

const ExpandingNodeWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
`;
