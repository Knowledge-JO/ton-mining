import { Address, Sender, SenderArguments } from "@ton/core";
import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";


export function useTonConnect():{
    sender: Sender;
    connected:boolean;
    wallet: string | null;
    network: CHAIN | null;
}{
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet()

    return{
        sender: {
            send : async(Args: SenderArguments)=>{
                tonConnectUI.sendTransaction({
                    messages:[{
                        address: Args.to.toString(),
                        amount: Args.value.toString(),
                        payload: Args.body.toBoc().toString("base64")
                    }],
                    validUntil: Date.now() + 5 * 60 * 1000
                })
                
            },
            address: wallet?.account.address ? Address.parse(wallet?.account.address as string) : undefined
        },
        connected: !!wallet?.account.address ,
        wallet: wallet?.account.address ?? null,
        network:wallet?.account.chain ?? null
      
    }
}