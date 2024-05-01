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

  const merchantApiKey = process.env.OXAPAY_API_KEY ; //process.env.OXAPAY_API_KEY | "sandbox" for developement;

  const url = "https://api.oxapay.com/merchants/request";
  const data = JSON.stringify({
    merchant: merchantApiKey, 
    amount,
    lifeTime: 30,
    feePaidByPayer: 1,
    underPaidCover: 0,
    callbackUrl: `${req.headers.origin}/dashboard`,
    returnUrl: `${req.headers.origin}/dashboard`,
    description: "Miner payment",
    orderId,
    email,
    power,
    userId,
  });

  try {
    const apiResponse = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    if (apiResponse.data && apiResponse.data.payLink) {
      // If there's a payLink, send it back to the client to redirect
      console.log("from make payment", apiResponse.data);

      // check every 2secs if the payment has being made, if after 30mins no payment, then the payment was not made
      let intervalId = setInterval(async () => await validatePayment(), 2000);

      // validate the payment by inquiring every 2secs if the user has paid
      async function validatePayment() {
        const url = "https://api.oxapay.com/merchants/inquiry";

        const data = JSON.stringify({
          merchant: merchantApiKey,
          trackId: apiResponse.data.trackId,
          power,
          amount,
          userId,
        });

        try {
          const inqResponse = await axios.post(url, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (inqResponse.data.status == "Paid") {
            clearInterval(intervalId);
            console.log("check from make payment", inqResponse.data);
            await createMiner(Number(power), Number(amount), userId);
          } else if (inqResponse.data.status == "Expired") {
            clearInterval(intervalId);
            console.log("Payment Expired");
          }
        } catch (e) {
          console.log(e);
        }
      }
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

async function fetchUnassignedImage() {
  const imagesRef = collection(db, "images");
  const q = query(imagesRef, where("assignedTo", "==", null));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    console.log("No unassigned images available.");
    return null;
  }
  console.log(snapshot.docs[0].data());
  return { minerImage: snapshot.docs[0].data().url, id: snapshot.docs[0].id };
}

const createMiner = async (power, cost, userId) => {
  const { minerImage, id } = await fetchUnassignedImage();
  const imageId = parseInt(id.slice(0, id.indexOf(".")), 10);
  const miner = new Miner(userId, power, cost, minerImage.url, imageId);
  const minerId = parseInt(miner.minerId, 10);
  try {
    const minerRef = doc(db, "miners", userId);
    const docSnap = await getDoc(minerRef);
    if (!docSnap.exists()) {
      console.log("minerId:", minerId);
      console.log("minerImage URL:", minerImage);

      await setDoc(minerRef, {
        minerId: [minerId],
        minerImage: [minerImage],
        userId,
        hashRate: Number(power), // Ensure this is a number.
        cost: Number(cost),
        totalMinedToday: 0,
        miningStarted: true,
        btcToUsd: 0,
      });
      console.log("user info created");
    } else {
      console.log("minerId:", minerId);

      console.log("minerImage URL:", minerImage);
      console.log("Updating with:", minerId, minerImage, power, cost);
      await updateDoc(minerRef, {
        hashRate: increment(Number(power)),
        minerId: arrayUnion(minerId),
        minerImage: arrayUnion(minerImage),
        cost: increment(Number(cost)),
      });
      console.log("user info updated");
    }

    console.log("updating with", id, userId);
    const imageRef = doc(db, "images", id);
    await updateDoc(imageRef, {
      assignedTo: userId,
    });

    console.log("Miner details saved to database successfully.");
  } catch (error) {
    console.error("Error saving miner details:", error);
  }
};
