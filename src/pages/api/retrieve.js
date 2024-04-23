// pages/api/retrieve-session.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items'], // Optionally expand details if needed
        });

        // Assuming metadata contains userId and amount
        if (session && session.metadata) {
            res.status(200).json({
                userId: session.metadata.userId,
                amount: session.metadata.amount,
                paymentSuccess: session.payment_status === 'paid' ? true : false
            });
        } else {
            res.status(404).json({ error: 'Session not found' });
        }
    } catch (error) {
        console.error('Failed to retrieve session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
