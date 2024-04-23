import React from 'react';
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
    Button
} from '@chakra-ui/react';

const steps = [
    { title: 'First', description: 'Miner' },
    { title: 'Second', description: 'Network' },
    { title: 'Third', description: 'Wallet' },
    { title: 'Third', description: 'Mint' },
];

const MintSteps = ({ minerId, onClose }) => {
    const { activeStep, setActiveStep } = useSteps({
        initialStep: 0,
    });

    const activeStepText = steps[activeStep].description;

    // Function to go to the next step
    const nextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    // Function to go to the previous step
    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    return (
        <Stack spacing={4}>
            <Stepper size='sm' index={activeStep} gap='0'>
                {steps.map((step, index) => (
                    <Step key={index} gap='0'>
                        <StepIndicator>
                            <StepStatus complete={<StepIcon />} />
                        </StepIndicator>
                        <StepSeparator _horizontal={{ ml: '0' }} />
                    </Step>
                ))}
            </Stepper>
            <Text>
                Step {activeStep + 1}: <b>{activeStepText}</b>
            </Text>
            <Box>
                <Button
                    colorScheme="teal"
                    variant="outline"
                    onClick={prevStep}
                    isDisabled={activeStep === 0}
                    mr={3}
                >
                    Previous
                </Button>
                <Button
                    colorScheme="teal"
                    onClick={nextStep}
                    isDisabled={activeStep === steps.length - 1}
                >
                    Next
                </Button>
            </Box>
        </Stack>
    );
};

export default MintSteps;
