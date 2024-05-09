import { fromNano } from "ton-core";
import { useTonClient } from "@/hooks/useTonClient";
import { useTonConnect } from "@/hooks/useTonConnect";
import { useJettonWallet } from "@/hooks/useJettonWallet";
import { useEffect, useState } from "react";

export function useBalance() {
  const { userAddress, connected } = useTonConnect();
  const { getBalance } = useJettonWallet();
  const [userBalance, setUserBalance] = useState();
  const client = useTonClient();

  useEffect(() => {
    (async () => {
      const bal = await getBalance();
      if (!bal) return;
      setUserBalance(fromNano(bal));
    })();

    return () => {};
  }, [client, userAddress, connected, getBalance, userBalance]);

  return { userBalance, setUserBalance };
}
