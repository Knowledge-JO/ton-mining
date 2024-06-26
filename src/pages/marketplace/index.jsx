import {
  Stack,
  Box,
  Heading,
  Spacer,
  Flex,
  Link,
  Text,
  Icon,
  Button,
  useColorModeValue,
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
import { IoMdList } from "react-icons/io";
import nft1 from "../../images/Nft1.png";
import Image from "next/image";

export default function marketplace() {
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
            <Flex p={5}>
              <Button
                border="2px solid"
                borderColor={useColorModeValue("#EDE8FC", "#301287")}
                width={"100px"}
                size={"sm"}
                variant="outline"
                color={useColorModeValue("#10062D", "#fff")}
                leftIcon={<IoMdList />}
                _hover="inherit"
              >
                Filter
              </Button>
            </Flex>
            <NFTCards />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}

const nftData = [
  {
    src: "https://gateway.pinata.cloud/ipfs/QmRqSZ2bFS46QYZ1HgwGurogGsrZrwMDaRgckM32yZKrQb/1.png",
    id: "1",
    title: "KdNFT",
  },
  {
    src: "https://gateway.pinata.cloud/ipfs/QmRqSZ2bFS46QYZ1HgwGurogGsrZrwMDaRgckM32yZKrQb/2.png",
    id: "2",
    title: "KdNFT",
  },
  {
    src: "https://gateway.pinata.cloud/ipfs/QmRqSZ2bFS46QYZ1HgwGurogGsrZrwMDaRgckM32yZKrQb/2.png",
    id: "2",
    title: "KdNFT",
  },
  {
    src: "https://gateway.pinata.cloud/ipfs/QmRqSZ2bFS46QYZ1HgwGurogGsrZrwMDaRgckM32yZKrQb/2.png",
    id: "2",
    title: "KdNFT",
  },
];
function NFTCards() {
  return (
    <div className="grid grid-cols-1 min-[460px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {nftData.map((data, index) => (
        <NFTCard marginBtm={50} dets={data} />
      ))}
    </div>
  );
}

function NFTCard({ dets, marginBtm }) {
  const { src, id: tokenId, title: collectionName } = dets;
  return (
    <>
      {/* <div className="border-2 border-solid border-[#EDE8FC] dark:border-[#301287] w-full rounded-lg text-black dark:text-white ">
        <Image
          src={src}
          width={500}
          height={500}
          className="rounded-lg w-full"
        />
        <div className="p-5 min-[460px]:px-3 min-[460px]:py-3 sm:p-5">
          <div className="flex justify-between items-center">
            <h2>#{tokenId}</h2>
            <button className="bg-[#EDE8FC] dark:bg-[#301287] w-[80px] min-[460px]:w-[60px] sm:w-[80px] py-1 rounded-lg">
              Buy
            </button>
          </div>
          <p className="mt-3 font-bold">{collectionName}</p>
        </div>
      </div> */}
      <Stack
        color={useColorModeValue("#10062D", "#fff")}
        w="full"
        rounded={"lg"}
        border="1px solid #301287"
        mb={{ base: marginBtm, md: 0 }}
        // className={`mb-[${paddingBtm}px] `}
      >
        <Image
          src={src}
          width={500}
          height={500}
          className="rounded-lg w-full"
        />
        <Flex p={5} align="center" justify="space-between">
          <Text fontSize="sm">#{tokenId}</Text>
          <Button bg={useColorModeValue("#8F6AFB", "#301287")}>Buy</Button>
        </Flex>
        <Text as="b" pb={5} pl={5}>
          {collectionName}
        </Text>
      </Stack>
    </>
  );
}
