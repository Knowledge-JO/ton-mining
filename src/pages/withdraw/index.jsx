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
    Spinner,
    Input,
    Button
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
  import { useState, useEffect } from "react";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { getFirestore, doc, setDoc } from "firebase/firestore";
  import { app } from "../../../Firebase/firebase";
import { toast } from "react-toastify";
 


const WithdrawTab = () => {
  const [address, setAddress] = useState('')
  const [user, setUser] = useState('')

  const auth = getAuth(app);

  const handleWithdrawal= async ()=>{
    const db = getFirestore(app)
    try {
      await setDoc(doc(db, "Address", user), {
        Address: address
      });
      toast.success('Wallet address received')
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        const userId = user.uid;
        setUser(userId)
      } else {
        setUser(null); // Set userdata to null when the user is not logged in
        toast.error("please login");
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <>
    <Box>
      {/* Navbar */}
      <Flex>
        <Navbar />
      </Flex>
      {/* Sidebar and dashscreen */}
      <Flex flexDir={["column", "column", "row", "row"]}>
        {/* Sidebar Component */}
        <IndexSidebar />
        {/* Dashscreen Components */}
        <Stack
          w={"100%"}
          bg={useColorModeValue("ffffff", "#10062D")}
          color={useColorModeValue("#10062D", "#fff")}
          spacing={5}
          p={5}
        >

            <Flex minH={'100vh'} direction={'column'} justifyContent={'center'} gap={10}>
                <Input alignSelf={'center'} placeholder='enter your withdrawal address' borderRadius={'10px'} maxW={'65vw'} value={address} onChange={(e)=>setAddress(e.target.value)}  />
                <Box maxW={'100vw'} alignSelf={'center'}>
                <Button
                w={'25vw'}
                borderRadius={'10px'}
                bg={useColorModeValue("#8F6AFB", "#3b49df")}
                color={'white'}
                _hover={{
                  background: 'transparent',
                  color: useColorModeValue('black', 'white'),
                  border: useColorModeValue('2px solid #8F6AFB', '2px solid #3b49df')
                }}
                onClick={handleWithdrawal}
                >Submit</Button> 
                </Box>
               
            </Flex>

        </Stack>
      </Flex>
    </Box>
  </>
  )
}

export default WithdrawTab