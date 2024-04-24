import {
  Stack,
  Box,
  Heading,
  Spacer,
  Flex,
  Link,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoHome } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { MdGroups, MdSpaceDashboard } from "react-icons/md";
import { GiMiner } from "react-icons/gi";
import { useMediaQuery } from "@chakra-ui/react";

export default function IndexSidebar() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const navData = [
    { icon: MdSpaceDashboard, title: "Dashboard", link: "/dashboard" },
    { icon: GiMiner, title: "My Miner", link: "/miner" },
    { icon: FaCartArrowDown, title: "Marketplace", link: "/marketplace" },
    { icon: MdGroups, title: "Referrals", link: "/referrals" },
  ];

  return (
    <>
      {isLargerThan768 ? (
        <Flex
          w={["0", "0", "15%", "15%"]}
          minH={"100vh"}
          align="start"
          justify={"center"}
          bg={useColorModeValue("ffffff", "#10062D")}
          color={useColorModeValue("#10062D", "#fff")}
          p={5}
          zIndex={1}
        >
          <Flex flexDir="column" p={5} fontWeight={700}>
            {navData.map((item) => (
              <Flex
                key={item.title}
                p={5}
                align="center"
                justify={"space-around"}
                gap={1}
              >
                <Icon as={item.icon} boxSize={5} />
                <Text
                  as={NextLink}
                  href={item.link}
                  fontSize={{ base: "xs", md: "md" }}
                >
                  {item.title}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ) : (
        <Flex
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg={useColorModeValue("white", "#10062D")}
          color={useColorModeValue("#10062D", "#fff")}
          p={5}
          justifyContent="space-around"
          zIndex={1}
        >
          {navData.map((item) => (
            <Flex
              key={item.title}
              flexDir="column"
              align="center"
              as={NextLink}
              href={item.link}
            >
              <Icon as={item.icon} boxSize={5} mb={2} />
              <Text fontSize={{ base: "xs", md: "md" }}>{item.title}</Text>
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
}
