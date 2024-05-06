import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, toNano } from '@ton/core';
import { useTonConnect } from './useTonConnect';
import { useJettonContract } from './useJettonContract';
import { transfer } from '../contract/JettonWalletContract';
import { CHAIN, useTonAddress } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export function useJettonWalletContract() {
  const { tonConnectUI } = useTonConnect();
  const clientAddress = useTonAddress();
  console.log('Client address:', clientAddress);
  const { contract } = useJettonContract();
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<Address | undefined>(undefined);

  useEffect(() => {
    async function fetchWalletAddress() {
      if (contract && clientAddress) {
        try {
          const address = await contract?.getWalletAddress(Address.parse(clientAddress));
          setWalletAddress(address);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch wallet address:", error);
          setLoading(false);
        }
      }
    }

    fetchWalletAddress();
  }, [contract, clientAddress]); 

useEffect(() => {
  if (walletAddress) {
    console.log('Wallet address:', walletAddress.toRawString());
  } else {
    console.log('Waiting for wallet address...');
  }
}, [walletAddress]);


const _transfer = async (to: Address, amount: bigint) => {
    if (!contract || !walletAddress) {
        console.log("Jetton wallet not found");
        return;
    }
   


    const body = transfer(to, Address.parse(clientAddress), amount);
    console.log(body.toBoc().toString('base64'));
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: walletAddress?.toRawString(),
          amount: toNano(0.05).toString(),
          payload: body.toString(),
        },
      ],
      network: CHAIN.MAINNET,
      
      
    }, {
      notifications: "all",
      modals: "all",
      returnStrategy: "back",
    });
};

return {
    loading,
    transfer: _transfer,
};
}