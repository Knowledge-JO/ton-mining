import { Stack, Flex } from "@chakra-ui/react";
import TopWidget from "@/components/Dashboard/topWidget";
import MidWidget from "@/components/Dashboard/midWidget";
import BtmWidget from "@/components/Dashboard/btmWidget";

export default function DashScreen({ miner, user }) {
  console.log('user deets from dashscreen', user)
  return (
    <>
      <Stack
        w={["100%", "100%", "85%", "85%"]}
        bg={"#10062D"}
        color="#fff"
        borderLeft="2px solid #301287"
        spacing={10}
        p={5}
      >
        {/* Top Section */}
        <TopWidget miner={miner} user={user} />
        {/* Mid Section */}
        <MidWidget />
        {/* Bottom Section */}
        <BtmWidget />
        <Flex w={"20%"} p={5}></Flex>
      </Stack>
    </>
  );
}
