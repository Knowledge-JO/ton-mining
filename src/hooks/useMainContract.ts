
// import { useAsyncInitialize } from "./useAsyncInitialize";
// import { NftCollection, Mint } from "@/wrappers/NftCollection";
// import { useTonClient } from "./useTonClient";
// import { Address, OpenedContract, toNano } from "@ton/core";
// import { useState } from "react";
// import { useTonConnect } from "./useTonConnect";


// export function useMainCOntract(){
//     const {client} = useTonClient()
//     const {wallet, sender} = useTonConnect()
//     const [balance, setBalance] = useState<string | null>()


//     const NftContract = useAsyncInitialize(async ()=>{
//         if(!client) return;

//         const contract = NftCollection.fromAddress(Address.parse("kQDrsDljxkfJh_fGIRU9CFDHS9sOoOkddDuRu4jE5DlEgHXw"))

//         return client.open(contract) as OpenedContract<NftCollection>
//     }, [client, wallet])

//     return{
//         mint : ()=>{
//             const message: Mint ={
//                 $$type: "Mint",
//                 query_id: 0n,
//             }

//             NftContract?.send(sender, {
//                 value: toNano('0.2'),
//             }, message)

        
//         }
//     }
// }