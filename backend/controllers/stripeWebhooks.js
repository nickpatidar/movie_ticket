import stripePackage from 'stripe';
import Booking from '../models/Booking.js';

export const stripeWebhooks = async (req, res) => {
  const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;

      // Fetch Checkout Sessions related to this payment intent
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
        limit: 1,
      });

      if (!sessions.data.length) {
        console.error('No checkout session found for payment intent:', paymentIntent.id);
        return res.status(400).send('No checkout session found.');
      }

      const session = sessions.data[0];
      const bookingId = session.metadata?.bookingId;

      if (!bookingId) {
        console.error('No bookingId found in session metadata');
        return res.status(400).send('No bookingId in metadata');
      }

      // Update booking record in MongoDB
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { isPaid: true, paymentLink: '' },
        { new: true }
      );

      if (!updatedBooking) {
        console.error('Booking not found for ID:', bookingId);
        return res.status(404).send('Booking not found');
      }

      console.log(`Booking ${bookingId} marked as paid.`);
    } else {
      console.log('Unhandled event type:', event.type);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).send('Internal Server Error');
  }
};
