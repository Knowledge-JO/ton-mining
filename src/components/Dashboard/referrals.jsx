import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, Stack, Text, Button } from "@chakra-ui/react";

export default function Referrals() {
  return (
    <>
      <Flex>
        <Stack p={5} spacing={10}>
          {/* 1st Section */}
          <Flex
            border="2px solid #FFFFFF"
            rounded={"2xl"}
            py={10}
            px={5}
            align={"center"}
            justify={"space-between"}
            gap={5}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Stack p={5}>
              <Text fontWeight={"400"}>Total Referral Bonus</Text>
              <Text fontWeight={"700"} fontSize="3xl">
                $0.00
              </Text>
            </Stack>
            <Stack p={5}>
              <Text>Total Referrals</Text>
              <Text fontWeight={"700"} fontSize="3xl">
                0
              </Text>
            </Stack>
            <Flex p={5}>
              <Button
                bg="#301287"
                color={"ffffff"}
                rightIcon={<ArrowForwardIcon />}
              >
                Share Referral Link
              </Button>
            </Flex>
          </Flex>
          {/* 2nd Section */}
          <Stack alignContent={"center"} justify="center">
            {" "}
            <Heading fontSize={"md"} textAlign="center">
              Refer Friends & Get Rewarded!
            </Heading>
            <Text whiteSpace={"pre-wrap"} textAlign="center">
              Get rewarded for sharing xxxxx with your friends. Invite them by
              using your unique code BLOCKCHAINBEAST link below.
            </Text>
          </Stack>
          <Flex></Flex>
          {/* 3rd Section */}
          <Flex
            align={"center"}
            justify={"space-around"}
            bg="#301287"
            borderRadius={"lg"}
            border="2px solid #301287"
            height={"70px"}
          >
            <Text>https://app.xxxxx.com/s/BLOCKCHAINBEAST</Text>
            <Button bg="#501EE1" color={"#FFFFFF"}>
              Copy
            </Button>
          </Flex>
          <Flex w={"20%"} p={5}></Flex>
        </Stack>
      </Flex>
    </>
  );
}
