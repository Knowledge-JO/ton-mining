import {
  Container,
  Box,
  Avatar,
  Button,
  HStack,
  VStack,
  Image,
  Input,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Link,
  MenuDivider,
  useColorModeValue,
  Flex,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import { FaBriefcase } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import CModal from "./Dashboard/createModal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { app } from "../../Firebase/firebase";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import useFirebaseUser from "../utils/useUser";

export default function Navbar() {
  // Define state to store user data
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useFirebaseUser();
  const fullName = user?.firstName + user?.lastName;

  const router = useRouter();

  const handlesignOut = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signOut(auth);
    router.push("/login");
  };

  return (
    <Box
      py="2"
      boxShadow="sm"
      borderBottom="2px solid"
      borderBottomColor={useColorModeValue("#EDE8FC", "#301287")}
      right={0}
      bg={useColorModeValue("#ffffff", "#10062D")}
      color={useColorModeValue("#10062D", "#fff")}
      width="100%"
    >
      <Container>
        <Flex width="auto" h={50} justify={"space-between"} align={"center"}>
          <Box w={"40%"}>
            <Image
              alt="dev logo"
              w={100}
              // h={12}
              src={colorMode == "light" ? "./4.png" : "./3.png"}
            />
          </Box>
          <Flex
            w={["50%", "100%"]}
            justify={["right", "space-between"]}
            gap={5}
          >
            <InputGroup display={["none", "block"]}>
              <InputLeftElement>
                <FaSearch />
              </InputLeftElement>
              <Input
                maxW={{ base: "100%", sm: "15rem", md: "20rem" }}
                placeholder="Search..."
                borderColor={useColorModeValue("#EDE8FC", "#301287")}
                borderRadius="10px"
                d={{ base: "none", md: "block" }}
                color={useColorModeValue("#10062D", "#fff")}
              />
            </InputGroup>
            <HStack spacing={3}>
              <>
                <CModal user={user} />
              </>
              {/* <>
                <TonConnectButton />
              </> */}
              {/* <Button
                as={NextLink}
                color="#fff"
                rounded="md"
                bg="#3b49df"
                _hover={{ bg: "#323ebe" }}
                href="/login"
                leftIcon={<FaBriefcase />}
              >
                Login
              </Button> */}
              <Button
                bg={useColorModeValue("#8F6AFB", "#3b49df")}
                onClick={toggleColorMode}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu isLazy>
                <MenuButton
                  as={Button}
                  size="sm"
                  px={2}
                  py={5}
                  rounded="lg"
                  _hover="inherit"
                >
                  <Avatar
                    size="sm"
                    src={
                      "https://avatars2.githubusercontent.com/u/37842853?v=4"
                    }
                  />
                </MenuButton>
                <MenuList
                  zIndex={5}
                  border="2px solid"
                  borderColor={useColorModeValue("gray.700", "gray.100")}
                  boxShadow="4px 4px 0"
                >
                  <Link
                    
                    _hover={{ textDecoration: "none" }}
                    isExternal
                  >
                    <MenuItem>
                      <VStack justifyContent="start" alignItems="left">
                        <Text fontWeight="500">
                          {`${user ? fullName : "anon"}`}
                        </Text>
                      </VStack>
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem>
                    <Text fontWeight="500">My Profile</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Text fontWeight="500">Wallet</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Text fontWeight="500" onClick={(e)=>handlesignOut(e)}>
                      Sign Out
                    </Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem></MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
