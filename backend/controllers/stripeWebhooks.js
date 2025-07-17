import Stripe from 'stripe';
import Booking from '../models/Booking.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Stripe signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const bookingId = session.metadata?.bookingId;

        if (!bookingId) {
          console.error("❌ No bookingId in session metadata");
          return res.status(400).send("No bookingId found.");
        }

        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: ""
        });

        console.log("✅ Booking updated:", bookingId);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('❌ Webhook processing error:', err);
    res.status(500).send('Internal Server Error');
  }
};
