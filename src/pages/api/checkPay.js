// pages/api/paymentInquiry.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { trackId, power, amount, userId } = req.body; // Extract data from the request body

    // You should have the merchant API key in environment variables for security
    const merchantApiKey = process.env.OXAPAY_API_KEY; //process.env.OXAPAY_API_KEY;
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
        console.log("Paid, Hurray!!");
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
