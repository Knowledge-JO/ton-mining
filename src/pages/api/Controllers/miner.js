import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


export default class Miner {
  constructor(userId, hashRate, cost) {
    this.minerId = uuidv4();  // Generates a unique UUID for each miner
    this.minerImage=`https://picsum.photos/seed/${this.minerId}/300/300`;
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
      this.btcToUsd = response.data.bitcoin.usd;  // Also update the BTC price in the database
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
     // Ensure the final state is saved when mining stops
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
    }, 1000);
  }



  getCurrentBalance() {
    return this.totalMinedToday;
  }
}

