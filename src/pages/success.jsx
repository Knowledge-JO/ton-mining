import { useRouter } from 'next/router';
import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { app } from '../../Firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, getFirestore, doc } from 'firebase/firestore';

export default function Success() {
    const router = useRouter();
    const { session_id, trackId } = router.query;
    const toast = useToast();
    const [user, setUser] = useState(null)  // Use Chakra's useToast for better UI integration

    useEffect(() => {
        const auth = getAuth();
       
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user.uid);
            const userId= user.uid
            const db = getFirestore(app);
            const docRef = doc(db, 'users', user.uid);
            getDoc(docRef)
              .then((docSnap) => {
                if (docSnap.exists()) {
                  const userData = docSnap.data();
                  console.log('User data:', userData);
                  setUser({userId, ...userData});
                } else {
                  console.log('User document not found.');
                }
              })
              .catch((error) => {
                console.error('Error fetching user data:', error.message);
              });
          } else {
            setUser(null); // Set userdata to null when the user is not logged in
            toast.error('please login');
            router.push('/login');
          }
        });
       
        return () => unsubscribe();
       }, []);
       

    useEffect(() => {
        const fetchData = async () => {
            if (session_id) {
                // For card payments
                const res = await fetch('/api/retrieve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionId: session_id })
                });
                const sessionDetails = await res.json();

                if (res.ok) {
                    router.push(`/dashboard?userId=${sessionDetails.userId}&amount=${sessionDetails.amount}&paymentSuccess=true`);
                } else {
                    toast(sessionDetails.message || "Error verifying payment.");
                }
            } else if (trackId) {
                // For crypto payments
                const res = await fetch('/api/checkPay', {  // Assuming you have a separate API for crypto
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ trackId: trackId })
                });
                const cryptoDetails = await res.json();
                console.log(cryptoDetails)

                if (cryptoDetails.status == "Paid") {
                    // Handle success, potentially redirecting or updating UI
                    router.push(`/dashboard?&amount=${cryptoDetails.amount}&email=${cryptoDetails.email}&paymentSuccess=true&userId=${user?.userId}`);
                } else {
                    toast(cryptoDetails.message || "Error verifying crypto payment.");
                }
            }
        };

        if (session_id || trackId) {
            fetchData();
        }
    }, [session_id, trackId, router, toast, user]);

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h1" size="xl" mb={2}>
                Payment Successful!
            </Heading>
            <Text fontSize="lg" mb={2}>
                Thank you for your purchase. Your transaction has been completed.
            </Text>
            <Text fontSize="md" mb={4}>
                Your session ID: {session_id || trackId}
            </Text>
            <Button colorScheme="blue" onClick={() => router.push('/dashboard')}>
                Go to Home
            </Button>
        </Box>
    );
}
