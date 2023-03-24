import { BigNumber } from "ethers";
import { ReactNode } from "react";
import { AllOrNone } from "types";

export type Selector<T> = (row: T) => string | number | boolean | BigNumber;

interface FilterProps<T> {
  filters: Filters<T>;
  initFilter: string;
  emptyStateMessage: string;
}

interface BaseProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  initSortKey?: string;
  isRowSelected?: (row: T) => boolean;
  expandingNode?: ReactNode;
  title?: string;
  initSortOrder?: "descending" | "ascending";
}

export type DatatableProps<T> = BaseProps<T> & AllOrNone<FilterProps<T>>;

export interface TableColumn<T> {
  cell?: (row: T) => ReactNode;
  selector: Selector<T>;
  name: string;
  sortable?: boolean;
  customSort?: (a: T, b: T) => number;
  side?: "left" | "right" | "center";
}

export type Filters<Row> = Record<string, (row: Row) => boolean>;
