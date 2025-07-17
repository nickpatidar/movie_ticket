import Booking from '../models/Booking.js';
import Stripe from 'stripe';

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
    console.log(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const bookingId = session.metadata.bookingId;

    if (!bookingId) {
      console.log('No bookingId in session metadata');
      return res.status(400).send('Missing bookingId in metadata');
    }

    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        console.log('Booking not found:', bookingId);
        return res.status(404).send('Booking not found');
      }

      booking.isPaid = true;
      await booking.save();

      console.log('Booking updated as paid:', bookingId);
      res.json({ received: true });
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).send('Server error');
    }

  } else {
    // Return 200 for other events we don't handle
    res.json({ received: true });
  }
};
