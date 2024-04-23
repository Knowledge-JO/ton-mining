import IndexSidebar from "@/components/sidebar";
import {
  Stack,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Card,
  SimpleGrid,
  Heading,
  Text,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react";
import NextImage from "next/image";
import Rec1 from "../../images/Rectangle 4 (1).png";
import Rec2 from "../../images/Rectangle 4 (2).png";
import Rec from "../../images/Rectangle 4.png";

import Carousel from "./carousel";

export default function DashTab() {
  const cardData = [
    { src: Rec, title: "The Zenith\nCollection", text: "5,000 NFTS" },
    { src: Rec1, title: "The Oasis\nCollection", text: "5,000 NFTS" },
    { src: Rec2, title: "The Aurora\nCollection", text: "5,000 NFTS" },
    { src: Rec2, title: "Zenith 2.0\nCollection", text: "5,000 NFTS" },
    // Add more card data objects as needed
  ];
  return (
    <>
      <Flex p={5}>
        <Tabs variant={"soft-rounded"} colorScheme="blue">
          <TabList>
            <Tab>All</Tab>
            <Tab>Top</Tab>
            <Tab>Trending</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid
                gap={5}
                columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
                direction={{ base: "column", sm: "row" }}
              >
                {cardData.map((card) => (
                  <Card rounded={"2xl"} position="relative" key={card.src}>
                    <Image
                      as={NextImage}
                      src={card.src}
                      placeholder="blur"
                      quality={100}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                    <Stack color={"white"} p={5} pos="absolute">
                      <Text fontSize={"xs"}>{card.text}</Text>
                      <Text
                        fontSize={{
                          base: "md",
                          sm: "md",
                          md: "lg",
                          lg: "2xl",
                        }}
                        whiteSpace="pre-wrap"
                      >
                        {card.title}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
