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
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  useColorMode,
  
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoHome, IoPerson } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { MdGroups, MdSpaceDashboard, MdCollections } from "react-icons/md";
import { GiMiner } from "react-icons/gi";
import { useMediaQuery } from "@chakra-ui/react";
import { IoMdWallet, IoMdMore } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { TonConnectButton } from "@tonconnect/ui-react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { PiHandWithdraw } from "react-icons/pi";

export default function IndexSidebar() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { colorMode, toggleColorMode } = useColorMode();

  const navData = [
    { icon: MdSpaceDashboard, title: "Dashboard", link: "/dashboard" },
    // { icon: IoPerson, title: "My profile", link: "" },
    // { icon: IoMdWallet, title: "Wallet", link: "" },
    { icon: MdCollections, title: "Collection", link: "#" },
    { icon: GiMiner, title: "My Miner", link: "/miner" },
    { icon: FaCartArrowDown, title: "Marketplace", link: "/marketplace" },
    { icon: MdGroups, title: "Referrals", link: "/referrals" },
    { icon: PiHandWithdraw, title: "Withdraw", link: "/withdraw"},
  ];

  return (
    <>
      {isLargerThan768 ? (
        <Flex
          w={["0", "0", "18%", "18%"]}
          minH={"100vh"}
          align="start"
          justify={"center"}
          bg={useColorModeValue("#F9F8FE", "#130736")}
          color={useColorModeValue("#10062D", "#fff")}
          p={5}
          zIndex={1}
        >
          <Flex flexDir="column" p={5} fontWeight={700}>
            {navData.map((item, index) => (
              <Tooltip
                label={`${index == 1 ? "Coming soon" : ""}`}
                aria-label="A tooltip"
                hasArrow={index == 1 ? true : false}
                placement="top"
                top={5}
              >
                <Flex
                  key={item.title}
                  p={5}
                  align="center"
                  justify={"left"}
                  gap={2}
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
              </Tooltip>
            ))}
          </Flex>
        </Flex>
      ) : (
        <Flex
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg={useColorModeValue("white", "#130736")}
          color={useColorModeValue("#10062D", "#fff")}
          p={5}
          justifyContent="space-around"
          zIndex={1}
        >
          {navData.slice(0, 4).map((item, index) => (
            <Tooltip
              label={`${index == 1 ? "Coming soon" : ""}`}
              hasArrow={index == 1 ? true : false}
              placement="top"
            >
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
              
            </Tooltip>
          ))}

          <Menu isLazy>
            <MenuButton
              bg={useColorModeValue("#fff", "#130736")}
              as={IconButton}
              _hover={{ bg: useColorModeValue("#fff", "#130736") }}
              icon={<HiDotsHorizontal />}
            />
            <MenuList>
              <MenuItem as={NextLink} href={"/referrals"}>
                Referrals
              </MenuItem>
              <MenuItem >
              <Button
                bg={useColorModeValue("#8F6AFB", "#3b49df")}
                onClick={toggleColorMode}
                display={["block", "block", "none"]}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
                </MenuItem>
            </MenuList>
          </Menu>
          
        </Flex>
      )}
    </>
  );
}
