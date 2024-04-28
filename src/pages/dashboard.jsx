import IndexSidebar from "@/components/sidebar";
import {
  Stack,
  Box,
  Heading,
  Spacer,
  Flex,
  Link,
  Text,
  Icon,
} from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Miner from "./api/Controllers/miner";
import DashScreen from "@/components/Dashboard/dashScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, doc, query, collection, where, getDocs, limit, setDoc, addDoc } from "firebase/firestore";
import { app, db } from "../../Firebase/firebase";
import { useRouter } from "next/router";



export default function dashboard() {
 // Define state to store user data
 const [user, setUser] = useState(null);
 const router = useRouter()
 const [miner, setMiner] = useState(null);
const [balance, setBalance] = useState(0);
const [isFetching, setIsFetching] = useState(false);
const [isMining, setIsMining] = useState(false);

 const { userId, amount, paymentSuccess } = router.query;


  // Fetch an unassigned image from Firestore
  async function fetchUnassignedImage() {
    const imagesRef = collection(db, "images");
    const q = query(imagesRef, where("assignedTo", "==", null), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.log("No unassigned images available.");
      return null;
    }
    return snapshot.docs[0];
  }

  // Calculate the total hash rate for a user
  async function getTotalHashRate(userId) {
    const q = query(collection(db, "miners"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.reduce((total, doc) => total + doc.data().hashRate, 0);
  }

  async function startMining(userId, hashRate, cost) {
    if (miner || isMining) {
      console.log("A miner is already set or mining is in progress.");
      return;
    }
  
    setIsMining(true); // Lock the function to prevent re-entry
  
    try {
      const totalHashRate = await getTotalHashRate(userId);
      const newTotalHashRate = totalHashRate + hashRate;
      const imageDoc = await fetchUnassignedImage();
  
      if (!imageDoc) {
        console.error("Failed to assign an image: No images available.");
        setIsMining(false);
        return;
      }
  
      const newMiner = new Miner(userId, newTotalHashRate, cost, imageDoc.data().url);
      setMiner(newMiner);
      newMiner.startMining();
      await setDoc(imageDoc.ref, { assignedTo: userId }, { merge: true });
  
      const docRef = await addDoc(collection(db, "miners"), {
        minerId: newMiner.minerId,
        userId: newMiner.userId,
        hashRate: newMiner.hashRate,
        cost: newMiner.cost,
        minerImage: newMiner.minerImage,
        totalMinedToday: newMiner.totalMinedToday,
        miningStarted: newMiner.miningStarted,
        btcToUsd: newMiner.btcToUsd
      });
  
      console.log("Miner added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error during mining operation: ", error);
    } finally {
      setIsMining(false); // Unlock the function
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ userId: firebaseUser.uid, ...userDoc.data() });
        } else {
          console.log('User document not found.');
          router.push('/login');
        }
      } else {
        setUser(null);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (paymentSuccess === 'true' && userId && amount && !miner) {
      console.log("Initializing mining for user ID from payment success:", userId);
      startMining(userId, amount / 24, amount);
    }
  }, [userId, amount, paymentSuccess, miner]);


  return (
    <>
      <Box>
        {/* Navbar */}
        <Flex>
          <Navbar />
        </Flex>
        {/* Sidebar and dashscreen */}
        <Flex flexDir={["column", "row", "row", "row"]}>
          {/* Sidebar Component */}
          <IndexSidebar />
          {/* Dashscreen Components */}
          <DashScreen miner={miner} user={user}/>
        </Flex>
      </Box>
    </>
  );
}
