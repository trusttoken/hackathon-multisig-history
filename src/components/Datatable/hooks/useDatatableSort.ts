import { useCallback, useReducer } from "react";
import { Selector } from "../types";

export type SortState<T> = {
  sortKey: string;
  selector: Selector<T>;
  descending?: boolean;
  customSort?: (a: T, b: T) => number;
};

function createDefaultSortState<T>(initSortState?: SortState<T>): SortState<T> {
  return {
    sortKey: initSortState?.sortKey ?? "",
    selector: initSortState?.selector ?? (() => 0),
    descending: initSortState?.descending,
    customSort: initSortState?.customSort,
  };
}

function getSortingReducer<T>() {
  return (
    state: SortState<T>,
    { sortKey, selector, customSort }: SortState<T>
  ): SortState<T> => {
    if (state.sortKey === sortKey) {
      return {
        ...state,
        descending: !state.descending,
      };
    }

    return {
      sortKey,
      selector,
      customSort,
      descending: true,
    };
  };
}

export function useDatatableSort<T>(initSortState?: SortState<T>) {
  const [sortState, dispatchSortState] = useReducer(
    getSortingReducer<T>(),
    createDefaultSortState<T>(initSortState)
  );

  const updateSortKey = useCallback(
    (
      selector: Selector<T>,
      sortKey: string,
      customSort?: (a: T, b: T) => number
    ) => dispatchSortState({ selector, sortKey, customSort }),
    []
  );

  return {
    sortState,
    updateSortKey,
  };
}
