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
import Navbar from "@/components/navbar";
import NextLink from "next/link";
import IndexSidebar from "@/components/sidebar";
import Referrals from "@/components/Dashboard/referrals";

export default function referrals() {
  return (
    <>
      <Box>
        {/* Navbar */}
        <Flex>
          <Navbar />
        </Flex>
        <Spacer />
        {/* Sidebar and dashscreen */}
        <Flex flexDir={["column", "column", "row", "row"]}>
          {/* Sidebar Component */}
          <IndexSidebar />
          {/* Dashscreen Components */}
          <Stack
            w={["100%", "100%", "85%", "85%"]}
            bg={useColorModeValue("ffffff", "#10062D")}
            color={useColorModeValue("#10062D", "#fff")}
            borderLeft="2px solid"
            borderLeftColor={useColorModeValue("#EDE8FC", "#301287")}
            spacing={5}
            p={5}
          >
            {/* Referrals Section */}
            <Referrals />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
