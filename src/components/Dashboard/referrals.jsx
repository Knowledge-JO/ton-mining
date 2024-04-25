import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  useColorModeValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";

export default function Referrals() {
  return (
    <Stack p={5} spacing={10}>
      {/* 1st Section */}
      <Grid
        border="2px solid"
        borderColor={useColorModeValue("#EDE8FC", "#301287")}
        color={useColorModeValue("#10062D", "#fff")}
        rounded={"2xl"}
        py={"50px"}
        px={10}
        gap={10}
        templateColumns={[
          "repeat(1, auto)",
          "repeat(2, auto)",
          "repeat(3, auto)",
        ]}
      >
        <GridItem>
          <Text fontWeight={"400"}>Total Referral Bonus</Text>
          <Text fontWeight={"700"} fontSize={["xl", "xl", "2xl"]}>
            $0.00
          </Text>
        </GridItem>
        <GridItem>
          <Text fontWeight={"400"}>Total Referrals</Text>
          <Text fontWeight={"700"} fontSize={["xl", "xl", "2xl"]}>
            0
          </Text>
        </GridItem>

        <GridItem>
          <Button
            bg={useColorModeValue("#8F6AFB", "#3b49df")}
            color={"ffffff"}
            rightIcon={<ArrowForwardIcon />}
            fontSize={"sm"}
          >
            Share Referral Link
          </Button>
        </GridItem>
      </Grid>
      {/* 2nd Section */}
      <Box textAlign={"center"}>
        <Heading fontSize={"md"}>Refer Friends & Get Rewarded!</Heading>
        <Text whiteSpace={"pre-wrap"} mt={2} fontSize={"sm"}>
          Get rewarded for sharing xxxxx with your friends. Invite them by using
          your unique code BLOCKCHAINBEAST link below.
        </Text>
      </Box>

      {/* 3rd Section */}
      <Box mb={"100px"}>
        <Flex
          align={"center"}
          justify={"space-between"}
          bg={useColorModeValue("#EDE8FC", "#301287")}
          borderRadius={"lg"}
          border="2px solid"
          borderColor={useColorModeValue("#EDE8FC", "#301287")}
          height={"70px"}
          px={[5, 5, 10]}
        >
          <Text
            fontSize={["13px", "13px", "lg"]}
            w={["145px", "230px", "auto"]}
          >
            https://app.xxxxx.com/s/BLOCKCHAINBEAST
          </Text>
          <Button size={["sm", "lg"]} bg="#501EE1" color={"#FFFFFF"}>
            Copy
          </Button>
        </Flex>
      </Box>
    </Stack>
  );
}
