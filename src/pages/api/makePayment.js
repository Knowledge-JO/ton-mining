import axios from "axios";
import {
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

import { db } from "../../../Firebase/firebase";
import Miner from "./Controllers/miner";

export const maxDuration = 30;
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { amount, orderId, email, power, userId } = req.body;
  console.log(amount, orderId, email);
  if (!amount || !orderId || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const merchantApiKey = process.env.OXAPAY_API_KEY; //process.env.OXAPAY_API_KEY | "sandbox" for developement;

  const url = "https://api.oxapay.com/merchants/request";
  const data = JSON.stringify({
    merchant: merchantApiKey,
    amount,
    lifeTime: 30,
    feePaidByPayer: 1,
    underPaidCover: 0,
    callbackUrl: `${req.headers.origin}/dashboard`,
    returnUrl: `${req.headers.origin}/dashboard`,
    description: `Miner payment for power - ${power}`,
    orderId,
    email,
    userId,
  });

  try {
    const apiResponse = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    if (apiResponse.data && apiResponse.data.payLink) {
      // If there's a payLink, send it back to the client to redirect
      console.log("from make payment", apiResponse.data, power);
      await updateUserWithTrackId(userId, apiResponse.data.trackId);
      res.status(200).json({ payLink: apiResponse.data.payLink });
    } else {
      // If no payLink in response, handle accordingly
      res.status(200).json(apiResponse.data);
    }
  } catch (error) {
    console.error("Error making payment request:", error);
    const errorMsg = error.response ? error.response.data : error.message;
    res.status(500).json({ error: errorMsg });
  }
}

async function updateUserWithTrackId(userId, trackId) {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log("updating db", userId);
    await updateDoc(userRef, {
      trackId: arrayUnion(trackId),
      unCheckedId: trackId,
    });
  }
}

// // check every 2secs if the payment has being made, if after 30mins no payment, then the payment was not made
// let intervalId = setInterval(async () => await validatePayment(), 2000);

// // validate the payment by inquiring every 2secs if the user has paid
// async function validatePayment() {
//   const url = "https://api.oxapay.com/merchants/inquiry";

//   const data = JSON.stringify({
//     merchant: merchantApiKey,
//     trackId: apiResponse.data.trackId,
//     power,
//     amount,
//     userId,
//   });

//   try {
//     const inqResponse = await axios.post(url, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (inqResponse.data.status == "Paid") {
//       clearInterval(intervalId);
//       console.log("check from make payment", inqResponse.data);
//       await createMiner(Number(power), Number(amount), userId);
//       res.status(200).json({ payLink: apiResponse.data.payLink });
//     } else if (inqResponse.data.status == "Expired") {
//       clearInterval(intervalId);
//       console.log("Payment Expired");
//       res.status(200).json({ payLink: apiResponse.data.payLink });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }
