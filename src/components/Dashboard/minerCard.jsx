"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Button,
  Flex,
  Card,
  CardFooter,
  Stack,
  Spacer,
  Image,
  Icon,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import nft1 from "../../images/Nft1.png";
import nft2 from "../../images/Nft2.png";
import nft3 from "../../images/Nft3.png";
import NextImage from "next/image";
import { IoMdList } from "react-icons/io";
import CModal from "./createModal";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { IoMdMore } from "react-icons/io";
import { TbTriangleSquareCircle } from "react-icons/tb";
import MintSteps from "../MintSteps";

export default function MinerCard() {
  const [minerDeets, setMinerDeets] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [activeMinerId, setActiveMinerId] = useState(null);

  const handleMintClick = (minerId) => {
    setActiveMinerId(minerId);
    onOpen(); // Open the modal
  };

  // useEffect(() => {
  //   const auth = getAuth();

  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user.uid);
  //       const userId = user.uid;
  //       const docRef = doc(db, "users", user.uid);
  //       getDoc(docRef)
  //         .then((docSnap) => {
  //           if (docSnap.exists()) {
  //             const userData = docSnap.data();
  //             console.log("User data:", userData);
  //             setUser({ userId, ...userData });
  //           } else {
  //             console.log("User document not found.");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching user data:", error.message);
  //         });
  //     } else {
  //       setUser(null); // Set userdata to null when the user is not logged in
  //       toast.error("please login");
  //       router.push("/login");
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  // async function getMinerDetailsByUserId(userId) {
  //   if (!userId) {
  //     // Check if userId is undefined
  //     console.error("No user ID provided");
  //     return; // Optionally handle this case more gracefully
  //   }
  //   const minersRef = collection(db, "miners");
  //   const q = query(minersRef, where("userId", "==", userId));

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     const miners = [];
  //     querySnapshot.forEach((doc) => {
  //       miners.push({ id: doc.id, ...doc.data() });
  //     });
  //     setMinerDeets(miners); // This returns an array of miners belonging to the user
  //   } catch (error) {
  //     console.error("Error fetching miner details:", error);
  //     throw new Error("Failed to retrieve miner details.");
  //   }
  // }

  // useEffect(() => {
  //   getMinerDetailsByUserId(user?.userId);
  // }, [user?.userId]);

  useEffect(() => {
    console.log(minerDeets);
  }, [minerDeets]);

  return (
    <>
      <Flex
        direction={"column"}
        p={5}
        h={"100vh"}
        bg={useColorModeValue("white", "#10062D")}
      >
        <Flex p={5} justify={"space-between"}>
          <Button
            border="2px solid"
            borderColor={useColorModeValue("#EDE8FC", "#301287")}
            width={"100px"}
            size={"sm"}
            variant="outline"
            color={useColorModeValue("#10062D", "#fff")}
            leftIcon={<IoMdList />}
            _hover="inherit"
          >
            Filter
          </Button>

          <Button
            bg={useColorModeValue("#EDE8FC", "#301287")}
            color={useColorModeValue("#10062D", "#fff")}
            _hover={{ bg: "#301287" }}
          >
            Upgrade
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={4}>
          {minerDeets &&
            minerDeets.map((miner) => {
              return (
                <Card
                  key={miner.minerId}
                  border="2px solid #301287"
                  bg="white"
                  rounded={"2xl"}
                  p={5}
                  h={"50vh"}
                >
                  <Image
                    // as={NextImage}
                    objectFit="cover"
                    src={miner?.minerImage}
                    alt="NFT"
                    width="100%"
                  />

                  <Stack p={5}>
                    <Flex
                      align={"start"}
                      justify={"space-between"}
                      alignItems={"center"}
                    >
                      <Text>#{miner?.minerId.slice(0, 7)}</Text>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<IoMdMore />}
                          variant="outline"
                          aria-label="Options"
                        />
                        <MenuList>
                          <MenuItem icon={<TbTriangleSquareCircle />}>
                            Upgrade
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleMintClick(miner.minerId)}
                          >
                            Mint
                          </MenuItem>
                          <MenuItem>View details</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                    <Text textAlign={"start"}></Text>
                  </Stack>
                </Card>
              );
            })}
        </SimpleGrid>

        {/* Modal for MintSteps */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Mint Miner</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {activeMinerId && <MintSteps minerId={activeMinerId} />}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
