import {
  Stack,
  Box,
  Flex,
  Card,
  SimpleGrid,
  Text,
  Icon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChartPie } from "react-icons/fa";
import Rec9 from "../../images/Rectangle9.png";
import NextImage from "next/image";

export default function BtmWidget() {
  const cardData = [
    { title: "Monthly Analysis", text: "Total Rewards" },
    // Add more card data objects as needed
  ];
  return (
    <>
      <SimpleGrid gap={5} columns={{ base: 1, sm: 1, md: 1, lg: 1 }}>
        {cardData.map((card) => (
          <Card
            rounded={"2xl"}
            key={card.src}
            border="2px solid"
            borderColor={useColorModeValue("#fff", "#130736")}
            bg={useColorModeValue("#8F6AFB", "#130736")}
            py={4}
          >
            <Flex justify="space-between" px={6}>
              <Flex>
                <Text color={"white"} fontWeight={"500"}>
                  {card.text}
                </Text>
              </Flex>
              <Box bg={"#fff"} rounded="full" p={1}>
                <Icon
                  boxSize={8}
                  color={useColorModeValue("#8F6AFB", "#501EE1")}
                  as={FaChartPie}
                />
              </Box>
            </Flex>

            <Stack color={"white"}>
              <TableContainer>
                <Table variant={"unstyled"}>
                  <Thead>
                    <Tr
                      color={useColorModeValue("#D2C3FD", "#A88BFC")}
                      borderBottom={"1px"}
                      borderColor={useColorModeValue("#fff", "#501EE1")}
                    >
                      <Th isNumeric>Date</Th>
                      <Th isNumeric>Computing Power</Th>
                      <Th isNumeric>Reward</Th>
                      <Th isNumeric>Address</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* <Tr
                      borderBottom={"1px"}
                      borderColor={useColorModeValue("#fff", "#501EE1")}
                    >
                      <Td isNumeric>4/8/2024</Td>
                      <Td isNumeric>1</Td>
                      <Td isNumeric>0.00000082</Td>
                      <Td isNumeric>18ihh9rs...3hcFPX1EF</Td>
                      <Td color={"#00D87D"}>Approved</Td>
                    </Tr>
                    <Tr
                      borderBottom={"1px"}
                      borderColor={useColorModeValue("#fff", "#501EE1")}
                    >
                      <Td isNumeric>4/8/2024</Td>
                      <Td isNumeric>1</Td>
                      <Td isNumeric>0.00000082</Td>
                      <Td isNumeric>18ihh9rs...3hcFPX1EF</Td>
                      <Td color={"#00D87D"}>Approved</Td>
                    </Tr>
                    <Tr
                      borderBottom={"1px"}
                      borderColor={useColorModeValue("#fff", "#501EE1")}
                    >
                      <Td isNumeric>4/8/2024</Td>
                      <Td isNumeric>1</Td>
                      <Td isNumeric>0.00000082</Td>
                      <Td isNumeric>18ihh9rs...3hcFPX1EF</Td>
                      <Td color="#FF4949">Declined</Td>
                    </Tr>
                    <Tr
                      borderBottom={"1px"}
                      borderColor={useColorModeValue("#fff", "#501EE1")}
                    >
                      <Td isNumeric>4/8/2024</Td>
                      <Td isNumeric>1</Td>
                      <Td isNumeric>0.00000082</Td>
                      <Td isNumeric>18ihh9rs...3hcFPX1EF</Td>
                      <Td color={"#00D87D"}>Approved</Td>
                    </Tr>
                    <Tr
                      borderBottom={"1px"}
                      borderColor={useColorModeValue("#fff", "#501EE1")}
                    >
                      <Td isNumeric>4/8/2024</Td>
                      <Td isNumeric>1</Td>
                      <Td isNumeric>0.00000082</Td>
                      <Td isNumeric>18ihh9rs...3hcFPX1EF</Td>
                      <Td color={"#00D87D"}>Approved</Td>
                    </Tr>
                    <Tr>
                      <Td isNumeric>4/8/2024</Td>
                      <Td isNumeric>1</Td>
                      <Td isNumeric>0.00000082</Td>
                      <Td isNumeric>18ihh9rs...3hcFPX1EF</Td>
                      <Td color={"#00D87D"}>Approved</Td>
                    </Tr> */}
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              </TableContainer>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
