const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PrEzpFdjrY56P1cqjq3g45v43hCnxBJyfSDhCHVnnenfSol1Jn2vy4SKLzdVMzqOcOZuIDudHy76l22rxsVVDTo004kHibLxh');

router.post('/', async (req, res) => {
  const { amount, meetingDetails } = req.body;

  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',  // Adjust currency as needed
            product_data: {
              name: 'Counseling Session',
            },
            unit_amount: amount * 100,  // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/meetwithcounsellor/notifications?session_id={CHECKOUT_SESSION_ID}`,  // Redirect after successful payment
      cancel_url: 'http://localhost:3000/cancel',  // Cancel URL
      metadata: meetingDetails,
    });

    // Respond with the URL to redirect the user to the Stripe checkout page
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe payment session:', error);
    res.status(500).json({ error: 'An error occurred during the payment process.' });
  }
});

module.exports = router;
