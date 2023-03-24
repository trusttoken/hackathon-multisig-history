import { useEthers } from "@usedapp/core";

export default function Home() {
  return (
    <>
      <main>
        <p>Let&apos;s get started</p>
        <ConnectButton />
      </main>
    </>
  );
}

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers();

  const metamaskActivate = () => activateBrowserWallet({ type: "Metamask" });
  const walletConnectActivate = () =>
    activateBrowserWallet({ type: "WalletConnect" });

  const ConnectButtons = () => (
    <div>
      <div>
        <button
          onClick={metamaskActivate}
        >{`Connect with \"Metamask\"`}</button>
      </div>
      <div>
        <button
          onClick={walletConnectActivate}
        >{`Connect with \"Wallet Connect\"`}</button>
      </div>
    </div>
  );

  const WalletConnectConnect = () => (
    <div>
      {account && (
        <div>
          <div className="inline">
            <div className="account">{account}</div>
          </div>
          <br />
        </div>
      )}
      {!account && <ConnectButtons />}
      {account && <button onClick={deactivate}>Disconnect</button>}
      <br />
    </div>
  );

  return (
    <div>
      <WalletConnectConnect />
    </div>
  );
};
