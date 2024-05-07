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
  Spinner,
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
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../Firebase/firebase";
import { useRouter } from "next/router";
import { db } from "../../Firebase/firebase";

export default function dashboard() {
  // Define state to store user data
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { trackId: newtrackId } = router.query;
  const [miner, setMiner] = useState(null);
  const [respData, setRespData] = useState();
  //get trackId from DB
  const validatePayment = async () => {
    const docRef = doc(db, "users", user.userId);
    const userQs = await getDoc(docRef);
    if (userQs.exists()) {
      const userData = userQs.data();
      const latestTrackId = userData.trackId[userData.trackId.length - 1];
      console.log(
        "user data ok",
        userData,
        latestTrackId,
        userData.unCheckedId
      );
      if (latestTrackId == userData.unCheckedId) {
        const resData = await queryOxaPay(userData.unCheckedId);
        setRespData(resData);
      }
    }
  };

  const queryOxaPay = async (trackId) => {
    const url = "/api/checkPay";
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trackId,
        userId: user.userId,
      }),
    });

    const data = await resp.json();
    console.log("queryOxaPay", data);
    return data;
  };
  useEffect(() => {
    if (!user) return;
    validatePayment();
  }, [user]);

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
        minerData.cost,
        "imageid"
      );
      // Optionally restore additional state
      existingMiner.totalMinedToday = minerData.totalMinedToday;
      existingMiner.miningStarted = minerData.miningStarted;
      existingMiner.lastUpdateTimestamp = minerData.lastUpdatedTime;

      setMiner(existingMiner);
      existingMiner.startMining();
    }
  };

  useEffect(() => {
    const auth = getAuth();
    setIsLoading(true);
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
        setIsLoading(false);
      } else {
        setUser(null); // Set userdata to null when the user is not logged in
        setIsLoading(false);
        toast.error("please login");
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

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
  }, [user, respData]);

  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner
          size="xl"
          color="blue.500"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      </Flex>
    );
  }
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
