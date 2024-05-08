import { useState, useEffect } from "react";
import { JettonMinter } from "../contracts/JettonMinter";
import { JettonWallet } from "../contracts/JettonWallet";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialze } from "./useAsyncInitialize";
import { Address, Cell, OpenedContract, toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

const jettonMinterAddress = Address.parse(
  "EQBF-Uf-wl8ZW_Kq0WoTGJP87CDSU6IJvn5KaF6k6pBaG47W"
);

// EQDBwyHGhAFmRLi4zhI-m7D8lZMj4zdbCEXBtY9Q-ghUImvU - og
// "UQAAlLzdeb9Xu3CUc0t4Y8AWwdMRMYKFsk-lrTPirmpPhLQY",-og
const adminAddress = Address.parse(
  "0QAHkXb_L7SAEshFkg1tHuS5FyT2R1BYyku3aS2TraMWRcvS"
);
export function useJettonWallet() {
  const client = useTonClient();
  const { sender, userAddress } = useTonConnect();
  //   const sleep = (time: number) =>
  //     new Promise((resolve) => setTimeout(resolve, time));

  const [userJettonWalletAddress, setUserJettonWalletAddress] =
    useState<null | Address>();

  //   const [jettonWalletContract, setJettonWalletContract] =
  //     useState<OpenedContract<JettonWallet>>();

  const jettonMinter = useAsyncInitialze(async () => {
    if (!client) return;
    const jettonMinterContract = new JettonMinter(jettonMinterAddress);

    return client.open(jettonMinterContract) as OpenedContract<JettonMinter>;
  }, [client]);

  useEffect(() => {
    async function getUserJettonWalletAddress() {
      if (!jettonMinter) return;
      if (!userAddress) return;
      setUserJettonWalletAddress(null);
      const jettonAddress = await jettonMinter.getWalletAddress(
        Address.parse(userAddress)
      );
      setUserJettonWalletAddress(jettonAddress);
    }

    getUserJettonWalletAddress();
  }, [userAddress, jettonMinter]);

  const jettonWallet = useAsyncInitialze(async () => {
    if (!client) return;
    if (!userJettonWalletAddress) return;
    const jettonWalletC = new JettonWallet(userJettonWalletAddress);
    return client.open(jettonWalletC) as OpenedContract<JettonWallet>;
  }, [client, userJettonWalletAddress]);

  return {
    getBalance: async () => {
      console.log(
        "from useJettonWallet",
        userAddress,
        userJettonWalletAddress?.toString()
      );
      console.log("balance", await jettonWallet?.getJettonBalance());
      return await jettonWallet?.getJettonBalance();
    },

    transfer: async (transferAmount: string) => {
      try {
        if (!userAddress) return "Plese connect your wallet";
        const senderAddress = Address.parse(userAddress);
        console.log(
          "transfer",
          userAddress,
          toNano(transferAmount),
          userJettonWalletAddress?.toString()
        );
        return await jettonWallet?.sendTransfer(
          sender,
          toNano("0.05"),
          toNano(transferAmount),
          adminAddress,
          senderAddress,
          new Cell(),
          toNano("0"),
          new Cell()
        );
      } catch (err) {
        console.log(err);
      }
    },
  };
}
