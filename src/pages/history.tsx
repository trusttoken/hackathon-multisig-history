import {useBlockNumber, useEthers} from "@usedapp/core";
import {useMemo} from "react";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import {ethers} from "ethers";
import SafeServiceClient from "@safe-global/safe-service-client";
import {useQuery} from "@tanstack/react-query";

export default function History() {
    const blockNumber = useBlockNumber()
    const {library} = useEthers()

    const serviceClient = useMemo(() => {
        if (library === undefined) {
            return undefined
        }
        const ethAdapter = new EthersAdapter({
            ethers,
            signerOrProvider: library
        })

        return new SafeServiceClient({
            txServiceUrl: 'https://safe-transaction-goerli.safe.global',
            ethAdapter
        })
    }, [library])

    const {data: safes} = useQuery({
        queryKey: ['safes', blockNumber],
        queryFn: async () => {
            return serviceClient?.getSafesByOwner('0xe13610d0a3e4303c70791773C5DF8Bb16de185d1')
        }
    })

    const {data: multisigTxs} = useQuery({
        queryKey: ['txs', '0x10443C6e07D43ad15D749931379feC963fCb6baD'],
        queryFn: async () =>{
            return serviceClient?.getMultisigTransactions('0x10443C6e07D43ad15D749931379feC963fCb6baD')
        }
    })
    console.log('multisigTxs: ', multisigTxs)

    return <div>
        <pre>
            {JSON.stringify(safes)}
        </pre>
        <pre>
            {JSON.stringify(multisigTxs)}
        </pre>
    </div>
}
