import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  IconButton,
  Text,
  Button,
  ButtonGroup,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Image,
  Link,
  Icon,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoMdAdd } from "react-icons/io";
import Rec9 from "../../images/Rectangle9.png";
import NextImage from "next/image";
import React, { useState, useEffect } from "react";
import Miner from "../../pages/api/Controllers/miner";
import { toast } from "react-toastify";
import PaymentModal from "./payModal";
import { SiBitcoincash } from "react-icons/si";
import { ArrowForwardIcon, InfoOutlineIcon } from "@chakra-ui/icons";

export default function CModal({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [power, setpower] = useState("");
  const [payout, setPayout] = useState(0);

  useEffect(() => {
    console.log(power);
    const payout = (power * 24 * 300) / 100;
    setPayout(payout);
  }, [power]);

  console.log(user);

  const [miner, setMiner] = useState(null);
  const [balance, setBalance] = useState(0);

  const [value, setValue] = React.useState(0);
  const handleChange = (value) => setpower(value);
  return (
    <>
      <IconButton
        bg={useColorModeValue("#8F6AFB", "#3b49df")}
        color="white"
        _hover="inherit"
        onClick={onOpen}
        icon={<IoMdAdd />}
      ></IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue("#8F6AFB", "#10062D")}
          color={useColorModeValue("#10062D", "#fff")}
          border="2px solid"
          borderColor={useColorModeValue("#EDE8FC", "#301287")}
        >
          <ModalHeader textAlign={"center"}>Create Miner</ModalHeader>
          <ModalBody>
            <Stack>
              <Heading size={"sm"}>Computing power</Heading>
              <ButtonGroup gap="4" variant={"outline"}>
                <Button
                  value={1}
                  onClick={(e) => setpower(e.target.value)}
                  color={"#00D87D"}
                  border="1px solid #301287"
                >
                  1 TH
                </Button>
                <Button
                  value={10}
                  onClick={(e) => setpower(e.target.value)}
                  color={"#00D87D"}
                  border="1px solid #301287"
                >
                  10 TH
                </Button>
                <Button
                  value={100}
                  onClick={(e) => setpower(e.target.value)}
                  color={"#00D87D"}
                  border="1px solid #301287"
                >
                  100 TH
                </Button>
                <NumberInput
                  value={power}
                  onChange={handleChange}
                  max={1000} // Set the maximum value for the NumberInput
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </ButtonGroup>
              <Stack>
                <Slider
                  color={"#00D87D"}
                  border="1px solid"
                  borderColor={useColorModeValue("#EDE8FC", "#301287")}
                  focusThumbOnChange={false}
                  value={power}
                  onChange={handleChange}
                  max={1000} // Set the maximum value for the Slider
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb fontSize="sm" boxSize="32px" children={value} />
                </Slider>
              </Stack>
              <Heading size={"sm"}>Rewards Calculation</Heading>
              <Tabs variant="enclosed" textColor="white">
                <TabList gap={1} mb={2}>
                  <Tab
                    bg="#3b49df"
                    rounded={"lg"}
                    border={"none"}
                    textColor="white"
                    w={100}
                  >
                    Annually
                  </Tab>
                  <Tab
                    bg="#3b49df"
                    rounded={"lg"}
                    border={"none"}
                    textColor="white"
                    w={100}
                  >
                    Daily
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel
                    backgroundImage={`url(${Rec9.src})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    rounded={"lg"}
                  >
                    <TableContainer
                      p={2}
                      borderRadius={"lg"}
                      bg={"rgba(59, 73, 223, 0.5)"}
                    >
                      <Table variant="simple">
                        <Tbody>
                          <Tr>
                            <Td fontSize="xs">POOL PAYOUT</Td>
                            <Td isNumeric align="center">
                              {payout}
                              <Icon
                                boxSize={3}
                                as={SiBitcoincash}
                                color={"yellow.50"}
                              />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontSize="xs">
                              <Flex align={"center"} justify={"space-between"}>
                                <Text>NET REWARD</Text> <InfoOutlineIcon />
                              </Flex>
                            </Td>
                            <Td isNumeric>${payout}</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>

                    <Stack p={2} fontSize="xs">
                      <Text>Reward history</Text>
                      {/* <Flex
                        p={3}
                        bg={"gray.400"}
                        rounded="2xl"
                        align={"center"}
                        justify={"space-between"}
                        gap={3}
                      >
                        <InfoOutlineIcon boxSize={4} />
                        <Text fontSize={"9px"} color={"white"}>
                          Bitcoin halving is expected around 21 April. Make sure
                          you adjust your investment strategy.
                        </Text>
                      </Flex> */}
                    </Stack>

                    <Flex p={2} align={"center"} justify="space-between">
                      <Link>
                        {" "}
                        <Text>Miner traits</Text>
                        <ArrowForwardIcon />
                      </Link>
                    </Flex>
                    <Stack
                      bg={"gray.700"}
                      border={"2px solid #301287"}
                      rounded={"lg"}
                      p={2}
                    >
                      <Flex align={"center"} justify={"space-between"}>
                        <Text>Price per TH</Text>
                        <Text>$24</Text>
                      </Flex>
                      <Flex align={"center"} justify={"space-between"}>
                        <Text>Historical ROI</Text>
                        <Text>${payout}</Text>
                      </Flex>
                      <Flex align={"center"} justify={"space-between"}>
                        <Text>Total</Text>
                        <Text>${power * 24}</Text>
                      </Flex>
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <PaymentModal user={user} payout={payout} power={power} />
            {/* <Button
              bg="#3b49df"
              textColor={"white"}
              mr={3}
              onClick={handleStartMining}
            >
              Next
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
