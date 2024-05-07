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
import { FaChartPie, FaDollarSign } from "react-icons/fa";
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
  // console.log(`user deets from top widget`, user);
  useEffect(() => {
    const interval = setInterval(() => {
      if (miner) {
        const newBalance = miner.getCurrentBalance();
        setBalance(newBalance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [miner]);

  useEffect(() => {
    // Save miner details to database
    if (!user) return;
    const userId = user.userId;
    //console.log(userId);
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
      // console.error("Error fetching number of miners:", error);
      setNumberOfMiners(0);
    }
  }

  async function saveToDatabase(miner, userId) {
    try {
      const minerRef = doc(db, "miners", userId);
      await updateDoc(minerRef, {
        totalMinedToday: miner.totalMinedToday,
        miningStarted: miner.miningStarted,
        // btcToUsd: miner.btcToUsd,
        lastUpdatedTime: miner.lastUpdateTimestamp,
      });
      //  console.log(
      //     "from topwidget savetodatabase",
      //     miner.lastUpdateTimestamp,
      //     miner.totalMinedToday,
      //     miner
      //   );
      // console.log("Miner details saved to database successfully.");
    } catch (error) {
      console.error("Error saving miner details:", error);
    }
  }

  useEffect(() => {
    // console.log("user form detch miner number", user?.userId);
    fetchNumberOfMiners(user?.userId);
  }, [user, miner]);

  const cardData = [
    {
      title: "Total Rewards",
      text: balance ? parseFloat(balance).toFixed(6) : 0,
    },
    {
      title: "Miners",
      text: numberOfMiners, // Use the state variable here
    },
    {
      title: "Power",
      text: miner?.hashRate ? miner.hashRate : 0,
    },
    {
      title: "Mean Efficiency",
      text: "35 W/TH",
    },
    // Add more card data objects as needed
  ];

  // console.log("miner from top widget", miner);
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
                ? useColorModeValue("#8F6AFB", "#301287")
                : useColorModeValue("#ffffff", "#10062D")
            }
            direction={"row"}
            px={6}
            py={4}
            gap={3}
          >
            <Box
              bg={useColorModeValue("#F9F8FE", "#ffff")}
              rounded="full"
              p={1}
            >
              <Icon
                boxSize={index == 0 ? 6 : 8}
                color={
                  index == 0
                    ? "green.500"
                    : useColorModeValue("#8F6AFB", "#501EE1")
                }
                as={index == 0 ? FaDollarSign : FaChartPie}
              />
            </Box>

            <Flex
              color={index == 0 ? "#fff" : useColorModeValue("#10062D", "#fff")}
              w={"100px"}
              direction={"column"}
              align={"left"}
            >
              <Text fontSize={"xs"} fontWeight="600">
                {card.title}
              </Text>
              <Text fontSize={"sm"} fontWeight="800">
                {card.text}
              </Text>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
}
