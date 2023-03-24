import { createContext, useContext } from "react";
import SafeServiceClient from "@safe-global/safe-service-client/dist/src/SafeServiceClient";

export interface SafeContextProviderProps {
  client: SafeServiceClient | null;
}

export const SafeContext = createContext<SafeContextProviderProps>({
  client: null,
});

export const useSafeClient = () => useContext(SafeContext);
