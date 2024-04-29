// pages/api/paymentInquiry.js
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
  if (req.method === "POST") {
    const { trackId, power, amount, userId } = req.body; // Extract data from the request body

    // You should have the merchant API key in environment variables for security
    const merchantApiKey = "sandbox";
    const url = "https://api.oxapay.com/merchants/inquiry";

    const data = JSON.stringify({
      merchant: merchantApiKey,
      trackId: trackId,
      power,
      amount,
      userId,
    });

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Send the response back to the client
      console.log("check", response.config.data);
      if (response.data.status == "Paid") {
        await createMiner(power, amount, userId);
      }
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error in payment inquiry:", error);
      res.status(500).json({
        message: "Failed to process payment inquiry",
        error: error.response ? error.response.data : error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
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
  return { minerImage: snapshot.docs[0].data(), id: snapshot.docs[0].id };
}

const createMiner = async (power, cost, userId) => {
  const { minerImage, id } = await fetchUnassignedImage();
  const miner = new Miner(userId, power, cost, minerImage.url);
  const minerId = miner.minerId;
  try {
    const minerRef = doc(db, "miners", userId);
    const docSnap = await getDoc(minerRef);
    if (!docSnap.exists()) {
      await setDoc(minerRef, {
        minerId: [minerId],
        minerImage: [minerImage.url],
        userId,
        hashRate: power,
        cost,
        totalMinedToday: 0,
        miningStarted: true,
        btcToUsd: 0,
      });
      console.log("user info created");
    } else {
      await updateDoc(minerRef, {
        hashRate: increment(power),
        minerId: arrayUnion(minerId),
        minerImage: arrayUnion(minerImage.url),
        cost: increment(Number(cost)),
      });
      console.log("user info updated");
    }

    const imageRef = doc(db, "images", id);
    await updateDoc(imageRef, {
      assignedTo: userId,
    });

    console.log("Miner details saved to database successfully.");
  } catch (error) {
    console.error("Error saving miner details:", error);
  }
};
