import { useState } from "react";
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
} from "@chakra-ui/react";
import { BiSolidPlug } from "react-icons/bi";
import { IoIosFlash } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "@chakra-ui/next-js";
import CModal from "./createModal";

export default function UpgradeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showList, setShowList] = useState(false); // Initialize showForm state
  const [showCard, setShowCard] = useState(false); // Add state for controlling card visibility

  const handleLinkClick = () => {
    setShowCard(true); // Show the card when the link is clicked
  };

  const handleAddMinerClick = () => {
    setShowList(!showList); // Toggle the showList state
    setShowCard(false); // Reset the showCard state
  };

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
      <Modal isOpen={isOpen} onClose={onClose}>
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
          <ModalBody>
            <Text>
              Choose a pack or customize an upgrade yourself to get more rewards
            </Text>
            <Button
              leftIcon={<IoIosAddCircleOutline />}
              onClick={handleAddMinerClick}
            >
              Add Miner
            </Button>
            {showList && (
              <Box
                bg={useColorModeValue("gray.100", "rgba(0,0,0,0.2)")}
                px={[3, 5]}
                py={3}
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
                      {" "}
                      <Text
                        color={"white.500"}
                        fontSize={["13px", "sm", "initial"]}
                      >
                        <Link href="#" onClick={handleLinkClick}>
                          The miner Box #14401
                        </Link>
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
                </Flex>
              </Box>
            )}
            {showCard && <CModal />}{" "}
            {/* Render the card component when showCard is true */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
