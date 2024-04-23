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
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { app } from "../../Firebase/firebase";

import { useRouter } from 'next/router';


export default function dashboard() {
  // Define state to store user data
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { userId, amount, paymentSuccess } = router.query;


  
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        const userId= user.uid
        const db = getFirestore(app);
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              console.log('User data:', userData);
              setUser({userId, ...userData});
            } else {
              console.log('User document not found.');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error.message);
          });
      } else {
        setUser(null); // Set userdata to null when the user is not logged in
        toast.error('please login');
        Router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const [miner, setMiner] = useState(null);
  const [balance, setBalance] = useState(0);


  const startMining = (userId, hashRate, cost) => {
    const newMiner = new Miner(userId, hashRate, cost);
    newMiner.startMining();
    setMiner(newMiner);
  };

  const handleStartMining = async (userId, hashRate, cost) => {
    setIsMining(true);
    try {
        const response = await fetch('/api/start-mining', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, hashRate, cost }),
        });
        if (response.ok) {
            console.log('Mining started successfully.');
        } else {
            console.error('Failed to start mining:', response.statusText);
        }
    } catch (error) {
        console.error('Error starting mining:', error);
    } finally {
        setIsMining(false);
    }
};


  useEffect(() => {
    if (paymentSuccess === 'true' && userId && amount) {
      const hashRate = amount/24
  

     
  
    }
}, [userId, amount, paymentSuccess]);


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
