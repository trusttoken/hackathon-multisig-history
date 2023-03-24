import { useMemo } from "react";
import { SortState } from "./useDatatableSort";
import { Selector } from "../types";
import { BigNumber } from "ethers";

const getDefaultSortFn = <T>(selector: Selector<T>) => {
  return (a: T, b: T) => {
    const aValue = selector(a);
    const bValue = selector(b);

    if (typeof aValue != typeof bValue) return 0;

    switch (typeof aValue) {
      case "number":
        return aValue - (bValue as number);
      case "boolean":
        if (aValue === bValue) return 0;
        return aValue ? 1 : -1;
      case "object":
        if (BigNumber.isBigNumber(aValue) && BigNumber.isBigNumber(bValue)) {
          return aValue.sub(bValue).toNumber();
        }
        throw new Error("Sorting only implemented for BigNumber objects");
    }
    return aValue.toString().localeCompare(bValue.toString());
  };
};

export function useSortedData<T>(data: T[], sortState: SortState<T>) {
  const sortedData = useMemo(() => {
    const { customSort, selector } = sortState;
    const sortedData = data.sort(customSort ?? getDefaultSortFn(selector));
    return sortState.descending ? [...sortedData.reverse()] : sortedData;
  }, [data, sortState]);

  return sortedData;
}
