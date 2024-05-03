import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  useColorModeValue,
  HStack,
  Box,
  Image,
  Flex,
  Heading,
  ButtonGroup,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Link,
  Icon,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import Rec9 from "../../images/Rectangle9.png";
import { BiSolidPlug } from "react-icons/bi";
import { IoIosFlash } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SiBitcoincash } from "react-icons/si";
import { ArrowForwardIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import PaymentModal from "./payModal";

export default function UpgradeModal({ user, minerDeets }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showList, setShowList] = useState(false);
  const [showCard, setShowCard] = useState(false); // Add state for controlling card visibility
  const [selectedMiner, setSelectedMiner] = useState(null);
  const [power, setpower] = useState("");
  const [payout, setPayout] = useState(0);
  const [rate, setRate] = useState(0.241);
  const [track, setTrack] = useState("Daily");

  const handleAddMinerClick = () => {
    setShowList((prevShowList) => !prevShowList);
  };

  const handleMinerClick = (miner) => {
    setSelectedMiner(miner);
    setShowCard(true);
    setShowList(false); // Hide the miner list after selection
    // Reset the previously selected miner
    // if (selectedMiner && selectedMiner.id !== miner.id) {
    //   setSelectedMiner(null);
    // }
  };

  const resetState = () => {
    setShowList(false);
    setShowCard(false);
    setSelectedMiner(null);
  };

  const handleModalClose = () => {
    resetState();
    onClose();
  };

  useEffect(() => {
    console.log(power);
    const payout = (power * 35 * rate) / 100;
    setPayout(payout);
  }, [power, rate]);

  console.log("miner deets from ugrademodal", minerDeets);

  console.log(user);

  const [miner, setMiner] = useState(null);
  const [balance, setBalance] = useState(0);

  const [value, setValue] = React.useState(0);
  const handleChange = (value) => setpower(value);

  return (
    <>
      <Button
        bg={useColorModeValue("#EDE8FC", "#301287")}
        color={useColorModeValue("#10062D", "#fff")}
        _hover={{ bg: "#301287" }}
        onClick={onOpen}
      >
        Upgrade
      </Button>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent
          textAlign={"center"}
          bg={useColorModeValue("#fff", "#10062D")}
          color={useColorModeValue("#10062D", "#fff")}
          border="2px solid"
          borderColor={useColorModeValue("#EDE8FC", "#301287")}
        >
          <ModalHeader>Upgrade your miner</ModalHeader>
          <ModalCloseButton />
          <ModalBody gap={10}>
            <Text mb={5}>
              Choose a pack or customize an upgrade yourself to get more rewards
            </Text>
            <Button
              leftIcon={<IoIosAddCircleOutline />}
              onClick={handleAddMinerClick}
              mb={5}
            >
              {showList ? "Hide Miners" : "Add Miner"}
            </Button>
            {showList && (
              <Box
                maxHeight="200px"
                overflowY="scroll"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "4px",
                  },
                }}
              >
                {minerDeets &&
                  minerDeets.map((miner) => (
                    <Box
                      key={miner.id}
                      bg={useColorModeValue("gray.100", "rgba(0,0,0,0.2)")}
                      px={[3, 5]}
                      py={3}
                      rounded={"20px"}
                      mb={3}
                      cursor="pointer"
                      onClick={() => handleMinerClick(miner)}
                      display={
                        selectedMiner && selectedMiner.id === miner.id
                          ? "none"
                          : "block"
                      }
                    >
                      <Flex justify={"space-between"} align={"center"}>
                        <HStack>
                          <Image
                            src={miner.minerImage}
                            width={[45, 35, 50]}
                            height={[45, 35, 50]}
                            rounded={"lg"}
                          />

                          <Box>
                            <Text
                              color={"white.500"}
                              fontSize={["13px", "sm", "initial"]}
                            >
                              The miner Box #{miner.id}
                            </Text>
                            <HStack fontSize={["13px", "sm"]}>
                              <HStack gap={"5px"}>
                                <Box
                                  p={"1px"}
                                  bg={"green.400"}
                                  rounded={"full"}
                                  color={"#fff"}
                                >
                                  <IoIosFlash />
                                </Box>
                                <Text>{miner.hashRate} TH</Text>
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
                      </Flex>
                    </Box>
                  ))}
              </Box>
            )}
            {selectedMiner ? (
              <>
                <Box
                  bg={useColorModeValue("gray.100", "rgba(0,0,0,0.2)")}
                  px={[3, 5]}
                  py={3}
                  rounded={"20px"}
                  mb={3}
                >
                  <Flex justify={"space-between"} align={"center"}>
                    <HStack>
                      <Image
                        src={selectedMiner.minerImage}
                        width={[45, 35, 50]}
                        height={[45, 35, 50]}
                        rounded={"lg"}
                      />

                      <Box>
                        <Text
                          color={"white.500"}
                          fontSize={["13px", "sm", "initial"]}
                        >
                          The miner Box #{selectedMiner.id}
                        </Text>
                        <HStack fontSize={["13px", "sm"]}>
                          <HStack gap={"5px"}>
                            <Box
                              p={"1px"}
                              bg={"green.400"}
                              rounded={"full"}
                              color={"#fff"}
                            >
                              <IoIosFlash />
                            </Box>
                            <Text>{selectedMiner.hashRate} TH</Text>
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
                  </Flex>
                </Box>
                <Stack>
                  {/* <Heading size={"sm"}>Computing power</Heading> */}
                  <ButtonGroup gap="4" variant={"outline"} mb={4}>
                    <Button
                      value={1}
                      onClick={(e) => setpower(e.target.value)}
                      color={"#00D87D"}
                      border="1px solid #301287"
                      fontSize={["12px", "initial"]}
                    >
                      1 TH
                    </Button>
                    <Button
                      value={10}
                      onClick={(e) => setpower(e.target.value)}
                      color={"#00D87D"}
                      border="1px solid #301287"
                      fontSize={["12px", "initial"]}
                    >
                      10 TH
                    </Button>
                    <Button
                      value={100}
                      onClick={(e) => setpower(e.target.value)}
                      color={"#00D87D"}
                      border="1px solid #301287"
                      fontSize={["12px", "initial"]}
                    >
                      100 TH
                    </Button>
                    <NumberInput
                      min={1}
                      value={power}
                      onChange={handleChange}
                      max={1000} // Set the maximum value for the NumberInput
                    >
                      <NumberInputField placeholder={"Value"} p={"5px"} />
                    </NumberInput>
                  </ButtonGroup>
                  <Heading size={"sm"}>Rewards Calculation</Heading>
                  <Tabs variant="line" textColor="#fff">
                    <TabList gap={1} mb={2} border={"none"}>
                      <Tab
                        rounded={"lg"}
                        textColor={useColorModeValue("#200C5A", "#fff")}
                        w={100}
                        onClick={() => {
                          setRate(0.241);
                          setTrack("Daily");
                        }}
                      >
                        Daily
                      </Tab>
                      <Tab
                        rounded={"lg"}
                        textColor={useColorModeValue("#200C5A", "#fff")}
                        w={100}
                        onClick={() => {
                          setRate(7.333);
                          setTrack("Monthly");
                        }}
                      >
                        Monthly
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel rounded={"lg"}>
                        <PayoutSummary
                          power={power}
                          payout={payout}
                          track={track}
                        />
                      </TabPanel>
                      <TabPanel>
                        <PayoutSummary
                          power={power}
                          payout={payout}
                          track={track}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Stack>
              </>
            ) : null}
            {/* Render the card component when showCard is true */}
          </ModalBody>
          <ModalFooter>
            <PaymentModal user={user} payout={payout} power={Number(power)} />

            {/* <Button
              bg={useColorModeValue("#8F6AFB", "#3b49df")}
              color="white"
              _hover="inherit"
              mr={3}
              onClick={handleModalClose}
            >
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const PayoutSummary = ({ payout, power, track }) => {
  return (
    <>
      <TableContainer bg={"#200C5A"} p={2} pb={5} mb={3} borderRadius={"lg"}>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td fontSize="xs">POOL PAYOUT</Td>
              <Td isNumeric align="center">
                {payout.toFixed(4)}
                <Icon boxSize={3} as={SiBitcoincash} color={"yellow.50"} />
              </Td>
            </Tr>
            <Tr>
              <Td fontSize="xs">
                <Flex align={"center"} gap={1}>
                  <Text>NET REWARD</Text> <InfoOutlineIcon />
                </Flex>
              </Td>
              <Td isNumeric>${payout.toFixed(4)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <Stack bg={"#200C5A"} border={"2px solid #301287"} rounded={"lg"} p={4}>
        <Flex align={"center"} justify={"space-between"}>
          <Text>Price per TH</Text>
          <Text>$35</Text>
        </Flex>
        <Flex align={"center"} justify={"space-between"}>
          <Text>Historical ROI</Text>
          <Text>{track && track == "Daily" ? "0.241% " : "7.333% "}</Text>
        </Flex>
        <Flex align={"center"} justify={"space-between"}>
          <Text>Total</Text>
          <Text>${power * 35}</Text>
        </Flex>
      </Stack>
    </>
  );
};
