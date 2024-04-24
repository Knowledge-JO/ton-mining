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
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../../Firebase/firebase";

export default function TopWidget({ miner, user }) {
  const [balance, setBalance] = useState(0);
  console.log(`user deets from top widget`, user);
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
    const userId = user?.userId;
    console.log(userId);
    if (miner) {
      saveToDatabase(miner, userId);
    }
  }, [balance, miner]);

  async function saveToDatabase(miner, userId) {
    try {
      const db = getFirestore(app);
      const minerRef = doc(db, "miners", userId);
      await setDoc(minerRef, {
        minerId: miner.minerId,
        minerImage: miner.minerImage,
        userId: miner.userId,
        hashRate: miner.hashRate,
        cost: miner.cost,
        totalMinedToday: miner.totalMinedToday,
        miningStarted: miner.miningStarted,
        btcToUsd: miner.btcToUsd,
      });

      console.log("Miner details saved to database successfully.");
    } catch (error) {
      console.error("Error saving miner details:", error);
    }
  }

  const cardData = [
    {
      title: "Total Rewards",
      text: balance ? parseFloat(balance).toFixed(20) : 0,
    },
    { title: "Miners", text: "1 Miner" },
    { title: "Power", text: miner?.hashRate ? miner.hashRate : 1 },
    { title: "Mean Efficiency", text: "35 W/TH" },
    // Add more card data objects as needed
  ];

  console.log("miner from top widget", miner);
  return (
    <>
      <SimpleGrid gap={10} columns={{ base: 2, sm: 2, md: 2, lg: 4 }}>
        {cardData.map((card) => (
          <Flex
            rounded={"2xl"}
            size="sm"
            key={card.src}
            border="2px solid"
            borderColor={useColorModeValue("#EDE8FC", "#301287")}
            align={"center"}
            justify={"space-around"}
            bg={useColorModeValue("ffffff", "#10062D")}
            direction={"row"}
            px={6}
            py={4}
          >
            <Box bg={""} rounded="full" p={1}>
              <Icon
                boxSize={8}
                color={useColorModeValue("#8F6AFB", "#501EE1")}
                as={FaChartPie}
              />
            </Box>

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
