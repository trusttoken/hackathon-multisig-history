import { SafeMultisigTransactionResponse as _SafeMultisigTransactionResponse } from "@safe-global/safe-core-sdk-types";

type DataParameter = {
  name: string;
  type: string;
  value: string | string[];
};

type DecodedData = {
  method: string;
  parameters: DataParameter[];
};

export type SafeMultisigTransactionResponse =
  _SafeMultisigTransactionResponse & {
    dataDecoded?: DecodedData;
  };
