import {
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import Miner from "@/pages/api/Controllers/miner";

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
  const miner = new Miner(userId, power, cost, imageId);
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
        lastUpdatedTime: Date.now(),
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

export { createMiner };
