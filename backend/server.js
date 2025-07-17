import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connect } from 'mongoose';
import connectToDb from './config/db.js';
import { clerkMiddleware } from '@clerk/express';

import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoutes.js';

import { stripeWebhooks } from './controllers/stripeWebhooks.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
await connectToDb();

// Stripe webhook route needs raw body parser to verify signatures
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// After webhook route, parse all other requests as JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Clerk authentication middleware
app.use(clerkMiddleware());

// Define your API routes
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

// Root route
app.get('/', (req, res) => res.send('Server is Live!'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
