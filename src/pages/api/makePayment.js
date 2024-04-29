import axios from "axios";

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

  const url = "https://api.oxapay.com/merchants/request";
  const data = JSON.stringify({
    merchant: "sandbox", // Consider using an environment variable here
    amount,
    lifeTime: 30,
    feePaidByPayer: 1,
    underPaidCover: 0,
    callbackUrl: `${req.headers.origin}/success?userId=${userId}&amount=${amount}&power=${power}`,
    returnUrl: `${req.headers.origin}/success?userId=${userId}&amount=${amount}&power=${power}`,
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
