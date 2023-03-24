import { DataTableBody } from "./DataTableBody";
import { DataTableHeader } from "./DataTableHeader";
import { DatatableProps } from "./types";
import { Table, TableContainer } from "./Table";
import { useDatatableSort } from "./hooks/useDatatableSort";
import { useSortedData } from "./hooks/useSortedData";

export function Datatable<T>({
  columns,
  data,
  initSortKey,
  initSortOrder = "descending",
  isRowSelected,
  expandingNode,
}: DatatableProps<T>) {
  const sortColumn =
    columns.find((column) => column.name === initSortKey) ?? columns[0];
  const { sortState, updateSortKey } = useDatatableSort({
    sortKey: sortColumn.name,
    selector: sortColumn.selector,
    customSort: sortColumn.customSort,
    descending: initSortOrder === "descending",
  });

  const sortedData = useSortedData(data, sortState);

  return (
    <TableContainer>
      {!!sortedData.length && (
        <Table>
          <DataTableHeader
            updateSortKey={updateSortKey}
            sortState={sortState}
            columns={columns}
          />
          <DataTableBody
            data={sortedData}
            columns={columns}
            isRowSelected={isRowSelected}
            expandingNode={expandingNode}
          />
        </Table>
      )}
    </TableContainer>
  );
}
