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
import {
  getFirestore,
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../Firebase/firebase";
import { useRouter } from "next/router";
import { db } from "../../Firebase/firebase";

export default function dashboard() {
  // Define state to store user data
  const [user, setUser] = useState(null);
  const router = useRouter();

  // const { userId, amount, paymentSuccess } = router.query;

  const existingMiner = async (userId) => {
    const minersQuery = query(
      collection(db, "miners"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(minersQuery);
    if (!querySnapshot.empty) {
      const minerData = querySnapshot.docs[0].data();
      console.log("Miner data:", minerData);
      const existingMiner = new Miner(
        minerData.userId,
        minerData.hashRate,
        minerData.cost
      );
      // Optionally restore additional state
      existingMiner.totalMinedToday = minerData.totalMinedToday;
      existingMiner.miningStarted = minerData.miningStarted;
      existingMiner.minerImage = "url";
      existingMiner.startMining();
      setMiner(existingMiner);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        const userId = user.uid;
        const db = getFirestore(app);
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              console.log("User data:", userData);
              setUser({ userId, ...userData });
              // Assuming each user has only one miner
              existingMiner(userId);
            } else {
              console.log("User document not found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error.message);
          });
      } else {
        setUser(null); // Set userdata to null when the user is not logged in
        toast.error("please login");
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const [miner, setMiner] = useState(null);
  const [balance, setBalance] = useState(0);

  // const startMining = (userId, hashRate, cost) => {
  //   const newMiner = new Miner(userId, hashRate, cost);
  //   newMiner.startMining();
  //   setMiner(newMiner);
  // };

  useEffect(() => {
    if (!user) return;
    const userId = user.userId;
    existingMiner(userId);
  }, [user]);

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
          <DashScreen miner={miner} user={user} />
        </Flex>
      </Box>
    </>
  );
}
