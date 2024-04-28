import {
  Stack,
  Box,
  Card,
  SimpleGrid,
  Text,
  Icon,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChartPie } from "react-icons/fa";
import { useState, useEffect } from "react";
import Miner from "@/pages/api/Controllers/miner";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../../Firebase/firebase";
import { FaBitcoin } from "react-icons/fa6";
import { LuBitcoin } from "react-icons/lu";
import { db } from "../../../Firebase/firebase";

export default function TopWidget({ miner, user }) {
  const [balance, setBalance] = useState(0);
  const [numberOfMiners, setNumberOfMiners] = useState(0);
  console.log(`user deets from top widget`, user);
  useEffect(() => {
    const interval = setInterval(() => {
      if (miner) {
        const newBalance = miner?.getCurrentBalance();
        setBalance(newBalance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [miner]);

  useEffect(() => {
    // Save miner details to database
    const userId = user?.userId;
    console.log(userId);
    if (miner) {
      saveToDatabase(miner, userId);
    }
  }, [balance, miner, user]);

  async function fetchNumberOfMiners(userId) {
    try {
      const q = query(collection(db, "miners"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs[0].data();
      setNumberOfMiners(data.minerId.length);
    } catch (error) {
      console.error("Error fetching number of miners:", error);
      setNumberOfMiners(0);
    }
  }

  async function saveToDatabase(miner, userId) {
    try {
      const minerRef = doc(db, "miners", userId);
      await updateDoc(minerRef, {
        totalMinedToday: miner.totalMinedToday,
        miningStarted: miner.miningStarted,
        btcToUsd: miner.btcToUsd,
      });
      console.log("Miner details saved to database successfully.");
    } catch (error) {
      console.error("Error saving miner details:", error);
    }
  }

  useEffect(() => {
    console.log("user form detch miner number", user?.userId);
    fetchNumberOfMiners(user?.userId);
  }, [user, miner]);

  const cardData = [
    {
      title: "Total Rewards",
      text: balance ? parseFloat(balance).toFixed(10) : 0,
    },
    {
      title: "Miners",
      text: numberOfMiners, // Use the state variable here
    },
    {
      title: "Power",
      text: miner?.hashRate ? miner.hashRate : 1,
    },
    {
      title: "Mean Efficiency",
      text: "35 W/TH",
    },
    // Add more card data objects as needed
  ];

  console.log("miner from top widget", miner);
  return (
    <>
      <SimpleGrid
        gap={{ base: 5, md: 10 }}
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
      >
        {cardData.map((card, index) => (
          <Flex
            rounded={"2xl"}
            size="sm"
            key={card.src}
            border="2px solid"
            borderColor={useColorModeValue("#EDE8FC", "#301287")}
            align={"center"}
            justify={"space-around"}
            bg={
              index == 0
                ? useColorModeValue("#ffffff", "#301287")
                : useColorModeValue("#ffffff", "#10062D")
            }
            direction={"row"}
            px={6}
            py={4}
            gap={3}
          >
            {index == 0 ? (
              <Flex
                bg={"white"}
                rounded="full"
                align={"center"}
                justify={"center"}
                h={10}
                w={10}
              >
                <Flex
                  bg={"#ED8936"}
                  rounded="full"
                  w={7}
                  h={7}
                  align={"center"}
                  justify={"center"}
                >
                  <Icon boxSize={5} color={"#fff"} as={LuBitcoin} />
                </Flex>
              </Flex>
            ) : (
              <Box bg={"white"} rounded="full" p={1}>
                <Icon
                  boxSize={8}
                  color={useColorModeValue("#8F6AFB", "#501EE1")}
                  as={FaChartPie}
                />
              </Box>
            )}

            <Stack color={useColorModeValue("#10062D", "#fff")} p={2}>
              <Text fontSize={"xs"} fontWeight="500">
                {card.title}
              </Text>
              <Text fontSize={"lg"} fontWeight="800">
                {card.text}
              </Text>
            </Stack>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
}
