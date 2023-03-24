import { ReactNode, useMemo } from "react";
import { useEthers } from "@usedapp/core";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { ethers } from "ethers";
import SafeServiceClient from "@safe-global/safe-service-client";
import {
  SafeContext,
  SafeContextProviderProps,
} from "@/pages/providers/SafeProvider/context";

export const SafeProvider = ({ children }: { children: ReactNode }) => {
  const { library, account } = useEthers();

  const value = useMemo<SafeContextProviderProps>(() => {
    if (library === undefined) {
      return {
        client: null,
      }
    }
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: library,
    });

    const serviceClient = new SafeServiceClient({
      txServiceUrl: "https://safe-transaction-goerli.safe.global",
      ethAdapter,
    });

    return {
      client: serviceClient ?? null,
    };
  }, [library, account]);

  return <SafeContext.Provider value={value}>{children}</SafeContext.Provider>;
};
