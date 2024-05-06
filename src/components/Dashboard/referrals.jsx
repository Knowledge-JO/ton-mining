import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FaChartPie, FaDollarSign, FaBitcoin } from "react-icons/fa";

import useFirebaseUser from "@/utils/useUser";
import { useEffect } from "react";

export default function Referrals() {
  const { user } = useFirebaseUser();

  const cardData = [
    {
      title: "Total Royalties",
      text: "0 XXXXXX",
    },
    {
      title: "Referrals",
      text: "0",
    },
    {
      title: "Purchased NFTs",
      text: "0",
    },
    // Add more card data objects as needed
  ];

  return (
    <Stack p={5} spacing={10} w={"100%"}>
      {/* 1st Section */}
      <Grid
        justifyContent={"space-between"}
        templateColumns={[
          "repeat(1, 100%)",
          "repeat(2,  48%)",
          "repeat(2, 48%)",
          "repeat(3, 31%)",
        ]}
        gap={3}
      >
        {cardData.map((card, index) => (
          <Flex
            rounded={"2xl"}
            key={card.src}
            border="2px solid"
            borderColor={useColorModeValue("#EDE8FC", "#301287")}
            align={"center"}
            justify={"space-around"}
            bg={
              index == 0
                ? useColorModeValue("#8F6AFB", "#301287")
                : useColorModeValue("#ffffff", "#10062D")
            }
            px={4}
            py={4}
            gap={3}
          >
            {index == 0 ? (
              <Box bg={"#ED8936"} p={1.5} rounded="full">
                <Icon boxSize={7} color={"#fff"} as={FaBitcoin} />
              </Box>
            ) : (
              <Box
                bg={useColorModeValue("#EDE8FC", "#ffff")}
                rounded="full"
                p={1.5}
              >
                <Icon
                  boxSize={7}
                  color={useColorModeValue("#8F6AFB", "#501EE1")}
                  as={FaChartPie}
                />
              </Box>
            )}

            <Stack
              color={index == 0 ? "#fff" : useColorModeValue("#10062D", "#fff")}
            >
              <Text fontSize={"xs"} fontWeight="600">
                {card.title}
              </Text>
              <Text fontSize={"sm"} fontWeight="800" mt={"-10px"}>
                {card.text}
              </Text>
            </Stack>
          </Flex>
        ))}
      </Grid>

      {/* 2nd Section */}
      <Box
        border="2px solid"
        borderColor={useColorModeValue("#EDE8FC", "#301287")}
        color={useColorModeValue("#10062D", "#fff")}
        rounded={"2xl"}
        align={"center"}
        justify={"space-between"}
        px={[5, 20]}
        py={[10, 20]}
      >
        <Heading fontSize={"md"}>Refer Friends & Get Rewarded!</Heading>
        <Text whiteSpace={"pre-wrap"} mt={2} fontSize={["13px", "sm"]}>
          Get rewarded for sharing xxxxx with your friends. Invite them by using
          your unique code <b>{user ? user.userId : ""}</b> link below.
        </Text>
      </Box>

      {/* 3rd Section */}
      <Box
        mb={10}
        px={[5, 5, 6]}
        py={3}
        bg={useColorModeValue("#F9F8FE", "#301287")}
        borderRadius={"lg"}
        display={"flex"}
        alignContent={"center"}
      >
        <Flex w={"100%"} align={"center"} justify={"space-between"}>
          <Box
            borderLeftRadius={"lg"}
            border={["0", "1px solid"]}
            borderColor={[
              useColorModeValue("#EDE8FC", "#501EE1"),
              useColorModeValue("#EDE8FC", "#501EE1"),
            ]}
            w={"100%"}
            display={"flex"}
            justifyContent={["left", "left", "left", "center"]}
            alignItems={"center"}
            h={10}
            pl={[0, 5]}
            py={[8, 6, 6, 6]}
          >
            <Text
              fontSize={["xs", "sm", "sm", "md"]}
              w={["145px", "230px", "230px", "auto"]}
            >
              https://app.xxxxx.com/s/{user ? user.userId : ""}
            </Text>
          </Box>

          <Button
            bg={useColorModeValue("#8F6AFB", "#501EE1")}
            borderRightRadius={"10px"}
            borderLeftRadius={["10px", "0"]}
            color={"#FFFFFF"}
            h={[10, "50px", "50px", "50px"]}
            w={"100px"}
          >
            Copy
          </Button>
        </Flex>
      </Box>
      <Grid
        templateColumns={"repeat(4, auto)"}
        gap={3}
        justifyContent={"center"}
        mt={"-50px"}
        mb={"80px"}
      >
        <Socials />
        <Socials />
        <Socials />
        <Socials />
      </Grid>
    </Stack>
  );
}

function Socials() {
  return (
    <Box
      w={14}
      h={10}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      rounded={"10px"}
      borderWidth={"1px"}
      borderColor={useColorModeValue("#8F6AFB", "#501EE1")}
    >
      <Icon
        as={FaChartPie}
        boxSize={6}
        color={useColorModeValue("#8F6AFB", "#501EE1")}
      ></Icon>
    </Box>
  );
}
