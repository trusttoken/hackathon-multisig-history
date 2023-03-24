import { ChainId, Config, Goerli, MetamaskConnector } from "@usedapp/core";
import { providers } from "ethers";
import { WalletConnectConnector } from "@usedapp/wallet-connect-connector";

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

export const getDAppConfig = (): Config => ({
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: getProvider("goerli"),
  },
  connectors,
  networks: [Goerli],
  multicallVersion: 2,
  fastMulticallEncoding: true,
  multicallAddresses: {
    [ChainId.Goerli]: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
  },
});

const connectors = {
  Metamask: new MetamaskConnector(),
  WalletConnect: new WalletConnectConnector({
    rpc: {
      5: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
    },
  }),
};

function getProvider(network: providers.Networkish & string) {
  return providers.InfuraProvider.getWebSocketProvider(network, INFURA_API_KEY);
}
