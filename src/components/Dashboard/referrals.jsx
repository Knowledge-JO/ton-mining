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
    <Stack p={5} spacing={10}>
      {/* 1st Section */}
      <SimpleGrid
        gap={{ base: 5, md: 10 }}
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
      >
        {cardData.map((card, index) => (
          <Flex
            rounded={"2xl"}
            size="sm"
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
            direction={"row"}
            px={6}
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
              p={2}
            >
              <Text fontSize={"xs"} fontWeight="500">
                {card.title}
              </Text>
              <Text fontSize={"lg"} fontWeight="800">
                {card.text}
              </Text>
            </Stack>
          </Flex>
        ))}
      </SimpleGrid>

      {/* 2nd Section */}
      <Box
        border="2px solid"
        borderColor={useColorModeValue("#EDE8FC", "#301287")}
        color={useColorModeValue("#10062D", "#fff")}
        rounded={"2xl"}
        align={"center"}
        justify={"space-between"}
        p={20}
      >
        <Heading fontSize={"md"}>Refer Friends & Get Rewarded!</Heading>
        <Text whiteSpace={"pre-wrap"} mt={2} fontSize={"sm"}>
          Get rewarded for sharing xxxxx with your friends. Invite them by using
          your unique code <b>{user ? user.userId : ""}</b>link below.
        </Text>
      </Box>

      {/* 3rd Section */}
      <Box mb={10}>
        <Flex
          align={"center"}
          justify={"space-between"}
          bg={useColorModeValue("#EDE8FC", "#301287")}
          borderRadius={"lg"}
          border="2px solid"
          borderColor={useColorModeValue("#EDE8FC", "#301287")}
          height={"70px"}
          px={[5, 5, 6]}
        >
          <Text
            fontSize={["13px", "13px", "md"]}
            w={["145px", "230px", "auto"]}
          >
            https://app.xxxxx.com/s/{user ? user.userId : ""}
          </Text>
          <Button size={["sm", "lg"]} bg="#501EE1" color={"#FFFFFF"}>
            Copy
          </Button>
        </Flex>
      </Box>

      <SimpleGrid
        border="2px solid"
        borderColor={useColorModeValue("#EDE8FC", "#301287")}
        color={useColorModeValue("#10062D", "#fff")}
        rounded={"2xl"}
        py={2}
        px={10}
        gap={{ base: 5, md: 20 }}
        columns={{ base: 4, sm: 4, md: 4, lg: 4 }}
        mb={10}
      >
        <Box
          border="2px solid"
          borderColor={useColorModeValue("#EDE8FC", "#301287")}
          bg={useColorModeValue("#8F6AFB", "#ffff")}
          rounded="full"
          align="center"
          justify={"center"}
          p={1}
        >
          <Icon
            boxSize={7}
            color={useColorModeValue("#F9F8FE", "#501EE1")}
            as={FaChartPie}
          />
        </Box>
        <Flex
          border="2px solid"
          borderColor={useColorModeValue("#EDE8FC", "#301287")}
          bg={useColorModeValue("#8F6AFB", "#ffff")}
          rounded="full"
          align="center"
          justify={"center"}
          p={1}
        >
          <Icon
            boxSize={7}
            color={useColorModeValue("#F9F8FE", "#501EE1")}
            as={FaChartPie}
          />
        </Flex>
        <Flex
          border="2px solid"
          borderColor={useColorModeValue("#EDE8FC", "#301287")}
          bg={useColorModeValue("#8F6AFB", "#ffff")}
          rounded="full"
          align="center"
          justify={"center"}
          p={1}
        >
          <Icon
            boxSize={7}
            color={useColorModeValue("#F9F8FE", "#501EE1")}
            as={FaChartPie}
          />
        </Flex>
        <Flex
          border="2px solid"
          borderColor={useColorModeValue("#EDE8FC", "#301287")}
          bg={useColorModeValue("#8F6AFB", "#ffff")}
          rounded="full"
          align="center"
          justify={"center"}
          p={1}
        >
          <Icon
            boxSize={7}
            color={useColorModeValue("#F9F8FE", "#501EE1")}
            as={FaChartPie}
          />
        </Flex>
      </SimpleGrid>
    </Stack>
  );
}
