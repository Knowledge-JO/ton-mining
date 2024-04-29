import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default class Miner {
  constructor(userId, hashRate, cost, Image, imageId) {
    this.minerId = imageId; // Generates a unique UUID for each miner
    this.minerImage = Image;
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
      this.btcToUsd = response.data.bitcoin.usd; // Also update the BTC price in the database
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
    const dailyROI = 0.00241; // 0.241% daily ROI
    const roiPerSecond = dailyROI / 86400; // divide daily ROI by number of seconds in a day

    const miningInterval = setInterval(() => {
      if (!this.miningStarted) {
        clearInterval(miningInterval);
        return;
      }

      const currentTime = Date.now();
      const elapsedTime = (currentTime - this.lastUpdateTimestamp) / 1000; // Convert milliseconds to seconds

      // Calculate earnings per second based on the elapsed time
      this.totalMinedToday += this.cost * roiPerSecond * elapsedTime;

      // Update last timestamp to current
      this.lastUpdateTimestamp = currentTime;
    }, 1000); // update every second
  }

  getCurrentBalance() {
    return this.totalMinedToday;
  }
}
