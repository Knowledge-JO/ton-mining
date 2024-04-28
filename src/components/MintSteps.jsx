import React from "react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import tonweb from "../../tonweb";
import TonWeb from "tonweb";

const MintSteps = ({ steps, activeStep }) => {
  const [collectionAddress, setCollectionAddress] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");

  // const handleMint = async () => {
  //   try {
  //     if (!collectionAddress) {
  //       setMessage("Please enter the collection address");
  //       return;
  //     }

  //     const address = tonweb.utils.addressFromInput(collectionAddress);

  //     const metaDataArray = [ /* Your NFT metadata array */ ];

  //     if (currentIndex >= metaDataArray.length) {
  //       setMessage("Invalid index. Please enter a value between 0 and " + (metaDataArray.length - 1));
  //       return;
  //     }

  //     const currentMetadata = metaDataArray[currentIndex];

  //     const mintFunction = {
  //       functionName: "mintNft",
  //       inputs: {
  //         value: tonweb.utils.cellFrom({
  //           boc: 0,
  //           ceils: [tonweb.utils.cellFrom(toNano("0.02"))],
  //         }),
  //         queryId: Math.floor(Math.random() * 10000),
  //         amount: tonweb.utils.cellFrom(toNano("0.014")),
  //         // Assuming consecutive indexing for minted NFTs within the collection
  //         itemIndex: 0,
  //         itemOwnerAddress: tonweb.utils.addressFromInput(YOUR_WALLET_ADDRESS), // Replace with your TON wallet address
  //         itemContent: tonweb.utils.cellFrom({
  //           boc: 0,
  //           ceils: [
  //             tonweb.utils.cellFrom(currentMetadata.name),
  //             tonweb.utils.cellFrom(currentMetadata.description),
  //             tonweb.utils.cellFrom(currentMetadata.image),
  //           ],
  //         }),
  //       },
  //     };

  //     const response = await tonweb.contract.run({
  //       address,
  //       functionName: mintFunction.functionName,
  //       inputs: mintFunction.inputs,
  //     });

  //     // Handle transaction response
  //     if (response.transactionId) {
  //       setMessage("Transaction Sent! Waiting for confirmation...");
  //       // Implement logic to check transaction status (refer to tonweb.js documentation)
  //     } else {
  //       setMessage("Error: " + response.error);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Error: " + error.message);
  //   }
  // };

  async function getCollectionData() {
    const data = await tonweb.provider.getAddressInfo({
      address: "kQDwByghhqlxMmx7uMgjVF7_5BTLw7ZBUuT8gtE10ARQ6O-f",
    });
    // Extract relevant data from data.data.code.storage
    return extractedData;
  }
  //   getCollectionData();
  return (
    <Stack spacing={4}>
      <Stepper size="sm" colorScheme={"purple"} index={activeStep} gap="0">
        {steps.map((step, index) => (
          <Step key={index} gap="0">
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <StepSeparator _horizontal={{ ml: "0" }} />
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default MintSteps;
