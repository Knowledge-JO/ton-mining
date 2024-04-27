import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { amount, orderId, email } = req.body;
    console.log(amount, orderId, email)
    if (!amount || !orderId || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const url = 'https://api.oxapay.com/merchants/request';
    const data = JSON.stringify({
        merchant: "sandbox", // Use an environment variable
        amount,
        lifeTime: 30,
        feePaidByPayer: 1,
        underPaidCover: 0,
        callbackUrl: `${req.headers.origin}/success`,
        returnUrl: `${req.headers.origin}/success`,
        description: 'Miner payment',
        orderId,
        email
    });

    try {
        const apiResponse = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json(apiResponse.data);
    } catch (error) {
        console.error('Error making payment request:', error);
        const errorMsg = error.response ? error.response.data : error.message;
        res.status(500).json({ error: errorMsg });
    }
}
