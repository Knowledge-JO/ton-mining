// pages/api/paymentInquiry.js
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { createMiner } from "@/utils/updatedb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { trackId, userId } = req.body; // Extract data from the request body

    // You should have the merchant API key in environment variables for security
    const merchantApiKey = process.env.OXAPAY_API_KEY; //process.env.OXAPAY_API_KEY;
    const url = "https://api.oxapay.com/merchants/inquiry";

    const data = JSON.stringify({
      merchant: merchantApiKey,
      trackId: trackId,
    });

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Send the response back to the client
      console.log("check", response.data);
      if (response.data.status == "Paid") {
        console.log("Paid, Hurray!!");
        // update db
        const power = response.data.description.split("-")[1].trim();
        await createMiner(power, response.data.amount, userId);
        // update unCheckedId
        console.log(userId, power, response.data.amount);
        const docRef = doc(db, "users", userId);
        console.log("Updating uncheckedId");
        await updateDoc(docRef, {
          unCheckedId: "",
        });
        console.log("updated uncheckedId");
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
