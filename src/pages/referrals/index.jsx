import {
  Stack,
  Box,
  Heading,
  Spacer,
  Flex,
  Link,
  Text,
  Icon,
} from "@chakra-ui/react";
import CardComponent from "@/components/Dashboard/dashCard2";
import DashTab from "@/components/Dashboard/dashTab";
import Navbar from "@/components/navbar";
import NextLink from "next/link";
import { IoHome } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { MdGroups } from "react-icons/md";
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
            bg={"#10062D"}
            color="#fff"
            borderLeft="2px solid #301287"
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
