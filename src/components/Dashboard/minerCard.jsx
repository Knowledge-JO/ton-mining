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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  useSteps,
  HStack,
} from "@chakra-ui/react";

import nft1 from "../../images/Nft1.png";
import nft2 from "../../images/Nft2.png";
import nft3 from "../../images/Nft3.png";
import NextImage from "next/image";
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
import {
  IoMdMore,
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosClose,
  IoMdList,
  IoIosFlash,
} from "react-icons/io";
import { TbTriangleSquareCircle } from "react-icons/tb";
import MintSteps from "../MintSteps";
import { useTonConnect } from "@/hooks/useTonConnect";
import tonweb from "../../../tonweb";
import { useTonClient } from "@/hooks/useTonClient";
import { Address, toNano } from "@ton/core";
import { useMainCOntract } from "@/hooks/useMainContract";
import useMinerDetails from "@/hooks/useMinerDetails";

import { BiSolidPlug } from "react-icons/bi";

export default function MinerCard() {
  const [minerDeets, setMinerDeets] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState("");
  const [activeMinerId, setActiveMinerId] = useState(null);
  const client = useTonClient();
  const { network, connected, wallet } = useTonConnect();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMintClick = (minerId) => {
    setActiveMinerId(minerId);
    onOpen(); // Open the modal
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user Id from miner card", user.uid);
        setUser(user.uid);
      } else {
        setUser(null); // Set userdata to null when the user is not logged in
        toast.error("please login");
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const fetchMinerDetails = async (userId) => {
    setLoading(true);
    const minersRef = collection(db, "miners");
    const q = query(minersRef, where("userId", "==", userId));

    try {
      const querySnapshot = await getDocs(q);
      const miners = [];
      querySnapshot.forEach((doc) => {
        // Assuming minerId and minerImage are arrays and have the same length
        const data = doc.data();
        data.minerId.forEach((id, index) => {
          miners.push({
            id: id,
            minerImage: data.minerImage[index],
            hashRate: data.hashRate,
            cost: data.cost,
            totalMinedToday: data.totalMinedToday,
            miningStarted: data.miningStarted,
            btcToUsd: data.btcToUsd,
          });
        });
      });
      setMinerDeets(miners);
    } catch (error) {
      console.error("Error fetching miner details:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMinerDetails(user);
  }, [user]);

  useEffect(() => {
    console.log(minerDeets);
  }, [minerDeets]);

  return (
    <>
      <Box p={5} bg={useColorModeValue("white", "#10062D")}>
        <Flex pb={5} justify={"space-between"}>
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
                  key={miner?.id}
                  border="2px solid #301287"
                  bg={"transparent"}
                  rounded={"2xl"}
                >
                  <Image
                    // as={NextImage}
                    objectFit="cover"
                    src={miner?.minerImage}
                    alt="NFT"
                    width="100%"
                    rounded={"2xl"}
                  />

                  <Stack p={5}>
                    <Flex
                      align={"start"}
                      justify={"space-between"}
                      alignItems={"center"}
                    >
                      <Text>#{miner?.id}</Text>
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
      </Box>
      {/* Modal for MintSteps */}
      <MinerModal
        isOpen={isOpen}
        onClose={onClose}
        activeMinerId={activeMinerId}
      />
    </>
  );
}

const steps = [
  {
    title: "Choose miner",
    description: "The miner that will be minted to your wallet",
  },
  {
    title: "Choose network",
    description: "The network on which you want to mint your miner",
  },
  {
    title: "Connect wallet",
    description:
      "Connect your wallet to the network chosen in the previous step",
  },
  { title: "Mint", description: "Mint you NFT" },
];

function MinerModal({ isOpen, onClose, activeMinerId }) {
  const { activeStep, setActiveStep } = useSteps({
    initialStep: 0,
  });

  const activeStepTitle = steps[activeStep].title;
  const activeStepDesc = steps[activeStep].description;

  // Function to go to the next step
  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  // Function to go to the previous step
  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0} bg={useColorModeValue("#fff", "#10062D")}>
          <Box p={5} mb={[0, 0, 5]}>
            <Button
              bg={"transparent"}
              color={"purple.400"}
              leftIcon={<IoIosArrowBack />}
              _hover={{
                bg: "purple.500",
                color: "#fff",
              }}
              fontWeight={"bold"}
              textAlign={"center"}
              onClick={onClose}
            >
              Back
            </Button>
          </Box>
          <Flex justify={"center"} align={"center"}>
            <Box
              w={["100%", "100%", "700px"]}
              border={["none", "none", "1px"]}
              borderColor={["", "", useColorModeValue("#EDE8FC", "#301287")]}
              rounded={"lg"}
              px={10}
              py={8}
            >
              {/* steps */}
              {activeMinerId && (
                <MintSteps
                  activeStep={activeStep}
                  minerId={activeMinerId}
                  steps={steps}
                />
              )}

              <Box mt={5}>
                <Heading fontSize={"xl"}>{`${
                  activeStep + 1
                }. ${activeStepTitle}`}</Heading>
                <Text fontSize={"sm"} color={"gray.400"} my={3}>
                  {activeStepDesc}
                </Text>
              </Box>

              <Steps activeStep={activeStep} />

              {/* buttons */}
              <Flex w={"100%"} justify={"space-between"} mt={"32px"}>
                <Button
                  border={"none"}
                  variant="outline"
                  mr={3}
                  bg={useColorModeValue("gray.100", "rgba(0,0,0,0.2)")}
                  w={"100%"}
                  onClick={prevStep}
                  isDisabled={activeStep === 0}
                  display={activeStep === 0 ? "none" : "block"}
                >
                  back
                </Button>
                <Button
                  _hover={{ bg: "purple.400" }}
                  bg="purple.500"
                  color={"#fff"}
                  border={"none"}
                  w={"100%"}
                  onClick={nextStep}
                  isDisabled={activeStep === steps.length - 1}
                >
                  Next
                </Button>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const networks = [
  { name: "Binance smart chain", symbol: "BEP-20" },
  { name: "Ethereum", symbol: "ETH" },
  { name: "Ordinals", symbol: "BRC" },
  { name: "Ton", symbol: "TON" },
];

const Steps = ({ activeStep }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Box>
      {activeStep + 1 == 1 && <Step1 />}
      {activeStep + 1 == 2 &&
        networks.map((network, index) => (
          <Step2
            key={network.symbol}
            name={network.name}
            index={index}
            isActive={isActive}
            setIsActive={setIsActive}
            symbol={network.symbol}
          />
        ))}
    </Box>
  );
};

const Step1 = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "rgba(0,0,0,0.2)")}
      px={[3, 5]}
      py={6}
      rounded={"20px"}
    >
      <Flex justify={"space-between"} align={"center"}>
        <HStack>
          <Image
            src={
              "https://gateway.pinata.cloud/ipfs/QmRqSZ2bFS46QYZ1HgwGurogGsrZrwMDaRgckM32yZKrQb/1.png"
            }
            width={[45, 35, 50]}
            height={[45, 35, 50]}
            rounded={"lg"}
          />

          <Box>
            <Text color={"purple.500"} fontSize={["13px", "sm", "initial"]}>
              The miner Box #14401
            </Text>
            <HStack fontSize={["13px", "sm"]}>
              <HStack gap={"5px"}>
                <Box p={"1px"} bg={"green.400"} rounded={"full"} color={"#fff"}>
                  <IoIosFlash />
                </Box>
                <Text>1 TH</Text>
              </HStack>
              <HStack ml={"5px"} gap={"5px"}>
                <Box
                  p={"1px"}
                  bg={"yellow.400"}
                  rounded={"full"}
                  color={"#fff"}
                >
                  <BiSolidPlug />
                </Box>
                <Text>35 W/TH</Text>
              </HStack>
            </HStack>
          </Box>
        </HStack>

        <HStack
          fontWeight={"extrabold"}
          fontSize={["15px", "15px", "20px"]}
          gap={0}
          color={"gray.400"}
        >
          <IoIosClose fontSize={"20px"} />
          <IoIosArrowDown />
        </HStack>
      </Flex>
    </Box>
  );
};

const Step2 = ({ name, isActive, setIsActive, symbol }) => {
  const clicked = symbol == isActive;

  function handleCustomRadio() {
    setIsActive(clicked ? null : symbol);
  }
  return (
    <Box
      bg={useColorModeValue("gray.100", "rgba(0,0,0,0.2)")}
      px={5}
      py={6}
      rounded={"20px"}
      mb={"8px"}
    >
      <Flex justify={"space-between"} align={"center"}>
        <HStack>
          <Text fontSize={["sm", "md"]} fontWeight={"extrabold"}>
            {name}
          </Text>
          <Text fontSize={["xs", "md"]} fontWeight={"bold"} color={"gray.400"}>
            {symbol}
          </Text>
        </HStack>

        <Box
          border={"1px"}
          w={"16px"}
          h={"16px"}
          rounded={"full"}
          borderColor={"gray.400"}
          cursor={"pointer"}
          bg={clicked ? "purple.500" : ""}
          onClick={() => handleCustomRadio()}
        ></Box>
      </Flex>
    </Box>
  );
};
