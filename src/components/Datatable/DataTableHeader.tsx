import { TableHeader } from "./TableHeader";
import { TableSortButton } from "./TableSortButton";
import { Selector, TableColumn } from "./types";
import { SortState } from "./hooks/useDatatableSort";
import { TableHeaderCell } from "./TableHeaderCell";

interface Props<Row> {
  columns: TableColumn<Row>[];
  updateSortKey: (
    selector: Selector<Row>,
    sortKey: string,
    customSort?: (a: Row, b: Row) => number
  ) => void;
  sortState: SortState<Row>;
}

export function DataTableHeader<Row>({
  columns,
  updateSortKey,
  sortState,
}: Props<Row>) {
  const { descending, sortKey } = sortState;
  return (
    <TableHeader>
      {columns.map(({ name, sortable, selector, customSort, side }, i) => (
        <TableHeaderCell side={side} key={i}>
          {sortable !== false ? (
            <TableSortButton
              onClick={() => updateSortKey(selector, name, customSort)}
              isSorting={sortKey === name}
              descending={!descending}
            >
              {name}
            </TableSortButton>
          ) : (
            name
          )}
        </TableHeaderCell>
      ))}
    </TableHeader>
  );
}
