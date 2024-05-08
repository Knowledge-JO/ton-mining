import { getHttpEndpoint } from "@orbs-network/ton-access";

import { TonClient } from "ton";
import { useAsyncInitialze } from "./useAsyncInitialize";

export function useTonClient() {
  return useAsyncInitialze(
    async () =>
      new TonClient({ endpoint: await getHttpEndpoint({ network: "testnet" }) })
  );
}
