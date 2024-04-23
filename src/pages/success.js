// pages/success.js
import { useRouter } from 'next/router';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import {toast} from 'react-toastify'
import { useEffect } from 'react';

export default function Success() {
    const router = useRouter();
    const { session_id } = router.query;

    useEffect(() => {
        const fetchSessionDetails = async () => {
            const res = await fetch('/api/retrieve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: session_id })
            });
            const sessionDetails = await res.json();

            if (res.ok) {
                // Redirect with details
                router.push(`/dashboard?userId=${sessionDetails.userId}&amount=${sessionDetails.amount}&paymentSuccess=true`);
            } else {
                toast({
                    title: "Payment Verification Failed",
                    description: sessionDetails.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        };

        if (session_id) {
            fetchSessionDetails();
        }
    }, [session_id, router]);

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h1" size="xl" mb={2}>
                Payment Successful!
            </Heading>
            <Text fontSize="lg" mb={2}>
                Thank you for your purchase. Your transaction has been completed.
            </Text>
            <Text fontSize="md" mb={4}>
                Your session ID: {session_id}
            </Text>
            <Button colorScheme="blue" onClick={() => router.push('/dashboard')}>
                Go to Home
            </Button>
        </Box>
    );
}
