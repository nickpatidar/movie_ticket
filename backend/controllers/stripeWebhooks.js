import Stripe from 'stripe';
import Booking from '../models/Booking.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    // req.body is a Buffer because of express.raw()
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful:', paymentIntent.id);

        const bookingId = paymentIntent.metadata?.bookingId;
        if (!bookingId) {
          console.warn('No bookingId found in paymentIntent metadata.');
          break;
        }

        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: '',
        });
        console.log(`Booking ${bookingId} marked as paid.`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).send('Internal Server Error');
  }
};
