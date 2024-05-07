import { useTonConnectUI, TonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';
import { Address } from '@ton/core';


export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  tonConnectUI: TonConnectUI;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet()
  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
      address: wallet?.account?.address ? Address.parse(wallet?.account?.address as string) : undefined
    },
    connected: tonConnectUI.connected,
    tonConnectUI: tonConnectUI,
  };
}