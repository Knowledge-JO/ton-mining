import { v4 as uuidv4 } from 'uuid';
import db from '../db';


export default class Miner {
  constructor(userId, hashRate, cost) {
    this.minerId = uuidv4();  // Generates a unique UUID for each miner
    this.userId = userId;
    this.hashRate = hashRate;
    this.cost = cost;
    this.totalMinedToday = 0;
    this.miningStarted = false;
    this.btcToUsd = 0;
    this.lastUpdateTimestamp = Date.now();
  }

  async fetchBTCPrice() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      this.btcToUsd = response.data.bitcoin.usd;
      this.updateDatabase();  // Also update the BTC price in the database
    } catch (error) {
      console.error("Error fetching BTC price:", error.message);
    }
  }

  startMining() {
    this.miningStarted = true;
    this.fetchBTCPrice();
    this.mine();
  }

  stopMining() {
    this.miningStarted = false;
    this.updateDatabase();  // Ensure the final state is saved when mining stops
  }

  mine() {
    const miningInterval = setInterval(() => {
      if (!this.miningStarted) {
        clearInterval(miningInterval);
      }

      const currentTime = Date.now();
      const elapsedTime = (currentTime - this.lastUpdateTimestamp) / 1000; // Convert milliseconds to seconds
      const minedPerSecond = (this.hashRate * elapsedTime) / 1000000000; // Assuming hashRate is in TH/s
      this.totalMinedToday += minedPerSecond;
      this.lastUpdateTimestamp = currentTime;

      this.updateDatabase();
    }, 1000);
  }

  updateDatabase() {
    db.collection('miners').doc(this.minerId).set({
      userId: this.userId,
      hashRate: this.hashRate,
      cost: this.cost,
      totalMinedToday: this.totalMinedToday,
      btcToUsd: this.btcToUsd,
      lastUpdateTimestamp: this.lastUpdateTimestamp,
      miningStarted: this.miningStarted
    }, { merge: true })
    .then(() => console.log("Miner data updated successfully"))
    .catch(error => console.error("Error updating miner data:", error));
  }

  getCurrentBalance() {
    return this.totalMinedToday;
  }
}

