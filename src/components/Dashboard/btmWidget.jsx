import {
  Stack,
  Box,
  Flex,
  Card,
  SimpleGrid,
  Text,
  Icon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChartPie } from "react-icons/fa";
import Rec9 from "../../images/Rectangle9.png";
import NextImage from "next/image";
import {
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { useEffect, useState } from "react";

export default function BtmWidget({ user }) {
  const [userDets, setUserdets] = useState({});
  const [address, setAddress] = useState('')
  const cardData = [
    { title: "Monthly Analysis", text: "Total Rewards" },
    // Add more card data objects as needed
  ];

  useEffect(() => {
    if (!user) return;
    getRewards();
    getAddress();
  }, [user]);

  async function getRewards() {
    const userId = user.userId;
    try {
      const q = query(collection(db, "miners"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs[0].data();
      setUserdets({ rewards: data.totalMinedToday, hashRate: data.hashRate });
    } catch (error) {
      console.error("Error fetching number of miners:", error);
    }
  }

  async function getAddress(){
    const userId = user.userId
    try {
      const q = query(collection(db, 'Address'), where("userId",  "==", userId))
      const querySnapshot= await getDocs(q)
      const data = querySnapshot.docs[0].data();
      console.log(querySnapshot.docs)
      setAddress(data.address)
    } catch (error) {
      console.error("Error fetching user address", error)
    }
  }

  return (
    <>
      <SimpleGrid gap={5} columns={{ base: 1, sm: 1, md: 1, lg: 1 }}>
        {cardData.map((card) => (
          <Card
            rounded={"2xl"}
            key={card.src}
            border="2px solid"
            borderColor={useColorModeValue("#fff", "#130736")}
            bg={useColorModeValue("#F9F8FE", "#130736")}
            py={4}
          >
            <Flex justify="space-between" px={5} fontSize={"sm"}>
              <Flex>
                <Text
                  color={useColorModeValue("#000", "#fff")}
                  fontWeight={"500"}
                >
                  {card.text}
                </Text>
              </Flex>
            </Flex>

            <Stack color={useColorModeValue("black", "white")}>
              <TableContainer>
                <Table
                  variant={"unstyled"}
                  color={useColorModeValue("#000", "#A88BFC")}
                >
                  <Thead>
                    <Tr
                      borderBottom={"1px"}
                      borderColor={useColorModeValue("#D4D4D4", "#501EE1")}
                    >
                      <Th isNumeric>Date</Th>
                      <Th isNumeric>Computing Power</Th>
                      <Th isNumeric>Reward</Th>
                      <Th isNumeric>Address</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  {userDets.hashRate && (
                    <Tbody>
                      <Tr
                        borderBottom={"1px"}
                        borderColor={useColorModeValue("#fff", "#501EE1")}
                      >
                        <Td isNumeric>{"5/15/2024"}</Td>
                        <Td isNumeric>{userDets.hashRate}</Td>
                        <Td isNumeric>{userDets.rewards.toFixed(2)}</Td>
                        <Td isNumeric>{address ? address : ''}</Td>
                        <Td color={`${"yellow.500"}`}>pending</Td>
                      </Tr>
                    </Tbody>
                  )}
                  <Tfoot></Tfoot>
                </Table>
              </TableContainer>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
