import Miner from "./Controllers/miner";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, hashRate, cost } = req.body;
        const miner = new Miner(userId, hashRate, cost);
        miner.startMining();
        res.status(200).json({ message: "Mining started successfully." });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
  }