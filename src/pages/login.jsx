import React, { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  Input,
  Checkbox,
  Stack,
  Button,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Link,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import spiralImg from "../images/Vector.png";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, getAuth } from "@firebase/auth";
import { increment } from "firebase/firestore";
import { getDoc, getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../../Firebase/firebase";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Login() {
  const { colorMode, toogleColormode } = useColorMode();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const auth = getAuth(app);
    try {
      // Simulate a 5-second delay before setting isLoading to false
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      // Fetch the user's role from Firestore based on their UID
      const db = getFirestore(app);
      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);

      // Get the current notifications array
      const userData = userDoc.data();
      const notifications = userData.notifications || [];

      // Add a new notification to the array
      notifications.push({
        message: "You've successfully logged in",
        timestamp: new Date(), // Set the timestamp in your code
      });

      // Update the notifications and increment unreadNotifications
      await updateDoc(userRef, {
        notifications,
        unreadNotifications: increment(1),
      });
      router.push("/dashboard");
      toast.success("Login successful");
    } catch (error) {
      console.log(error);

      // Simulate a 4-second delay before setting isLoading to false
      await new Promise((resolve) => setTimeout(resolve, 4000));

      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("ffffff", "#10062D")} position="relative">
        <Image
          src={spiralImg}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack
            spacing={8}
            mx={"auto"}
            maxW={"2xl"}
            py={10}
            px={6}
            position="absolute"
          >
            <Box
              rounded={"lg"}
              bg={useColorModeValue("ffffff", "#10062D")}
              p={8}
              border="2px solid"
              borderColor={useColorModeValue("#EDE8FC", "#301287")}
              boxShadow="0 0 10px 5px rgba(48, 18, 135, 0.5)"
              minW={{ sm: "md", md: "lg" }}
              minH={{ sm: "md", md: "lg" }}
            >
              <Stack spacing={10}>
                <Heading size={"h5"} textAlign="center" color={"#501EE1"} p={5}>
                  Login
                </Heading>
                <FormControl id="email">
                  <Input
                    type="email"
                    size={"lg"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username or E-mail"
                    _placeholder={{ color: "#C5C0C0" }}
                    border="2px solid #301287"
                  />
                </FormControl>
                <FormControl id="password">
                  <InputGroup
                    size={"lg"}
                    border="2px solid #301287"
                    rounded={"md"}
                  >
                    {" "}
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      _placeholder={{ color: "#C5C0C0" }}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        variant={"ghost"}
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                        icon={show ? <ViewOffIcon /> : <ViewIcon />}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} align="center">
                  <Button
                    isLoading={isLoading}
                    loadingText="Submitting"
                    size="lg"
                    bg={useColorModeValue("#8F6AFB", "#301287")}
                    color="white"
                    _hover={{ bg: "blue.500" }}
                    onClick={login}
                    disabled={isLoading}
                  >
                    Login
                  </Button>{" "}
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"center"}
                    spacing={10}
                  >
                    <Text color={useColorModeValue("#10062D", "#fff")}>
                      Don't have an account?
                    </Text>
                    <Link as={NextLink} href="/signup" color={"#501EE1"}>
                      Signup
                    </Link>
                  </Stack>
                  <Button onClick={toogleColormode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
