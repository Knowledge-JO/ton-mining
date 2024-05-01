import {
  Stack,
  Box,
  Heading,
  Spacer,
  Flex,
  Link,
  Text,
  Icon,
  useColorModeValue,
  Spinner
} from "@chakra-ui/react";
import CardComponent from "@/components/Dashboard/dashCard2";
import DashTab from "@/components/Dashboard/dashTab";
import Navbar from "@/components/navbar";
import NextLink from "next/link";
import { IoHome } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { MdGroups } from "react-icons/md";
import IndexSidebar from "@/components/sidebar";
import MinerCard from "@/components/Dashboard/minerCard";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../../Firebase/firebase";

export default function minerDash() {
const [user, setUser] = useState(null)

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


  if (user === null) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" color="blue.500" thickness='4px'
  speed='0.65s'
  emptyColor='gray.200' />
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
        <Flex flexDir={["column", "column", "row", "row"]}>
          {/* Sidebar Component */}
          <IndexSidebar />
          {/* Dashscreen Components */}
          <Stack
            w={"100%"}
            bg={useColorModeValue("ffffff", "#10062D")}
            color={useColorModeValue("#10062D", "#fff")}
            spacing={5}
            p={5}
          >
            {/* Card Section */}
            <MinerCard />
            {/* Tab Section */}
            {/* <DashTab /> */}
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
