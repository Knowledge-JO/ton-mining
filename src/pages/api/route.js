// pages/api/create-payment-session.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { amount, userId } = req.body; // Assuming amount and userId are passed in

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Miner Purchase',
                    },
                    unit_amount: amount + 1.15 * 100, // Stripe requires amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
            metadata: { userId, amount } // Storing userId and amount in metadata for later use
        });

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating payment session:', error);
        res.status(500).json({ error: 'Failed to create payment session' });
    }
}
