"use client";
import NextLink from "next/link";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import spiralImg from "../images/Vector.png";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { app } from "../../Firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const auth = getAuth(app);
    try {
      // Create user with email and password
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      // Save additional user details to Firestore using the userId as the document ID
      const db = getFirestore(app);
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        Email: email,
        role: "User",
        status: "active",
      });

      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      const errorMessage = error.message;
      toast.error(`Error: ${errorMessage}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg={useColorModeValue("white", "#10062D")} position="relative">
      <Image
        src={spiralImg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />{" "}
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"2xl"}
          py={12}
          px={6}
          pos={"absolute"}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "#10062D")}
            p={8}
            border="2px solid"
            borderColor={useColorModeValue("#EDE8FC", "#301287")}
            boxShadow="0 0 10px 5px rgba(48, 18, 135, 0.5)"
            minW={{ sm: "md", md: "lg" }}
            minH={{ sm: "md", md: "lg" }}
            color={useColorModeValue("#10062D", "#fff")}
          >
            <Stack spacing={10}>
              <Heading fontSize={"4xl"} textAlign={"center"} color={"#501EE1"}>
                Sign up
              </Heading>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="First Name"
                      _placeholder={{ color: "#C5C0C0" }}
                      border="2px solid #301287"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      _placeholder={{ color: "#C5C0C0" }}
                      border="2px solid #301287"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Email address"
                  _placeholder={{ color: "#C5C0C0" }}
                  border="2px solid #301287"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup
                  size={"lg"}
                  border="2px solid #301287"
                  rounded={"md"}
                >
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    _placeholder={{ color: "#C5C0C0" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <IconButton
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    />
                    {/* <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      { ? <ViewIcon /> : <ViewOffIcon />}
                    </Button> */}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  loadingText="Submitting"
                  size="lg"
                  bg="#301287"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  onClick={register}
                  disabled={isLoading} // Disable the button while loading
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text
                  align={"center"}
                  color={useColorModeValue("#10062D", "#fff")}
                >
                  Already a user?{" "}
                  <Link as={NextLink} href="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
