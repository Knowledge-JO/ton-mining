// pages/cancel.js
import { useRouter } from 'next/router';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

export default function Cancel() {
    const router = useRouter();

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h1" size="xl" mb={2}>
                Payment Cancelled
            </Heading>
            <Text fontSize="lg" mb={2}>
                Your transaction was not completed. If this was an error, please try again.
            </Text>
            <Button colorScheme="blue" onClick={() => router.push('/dashboard')}>
                Return to Home
            </Button>
        </Box>
    );
}
