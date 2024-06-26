import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_TEST_STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export { stripe };
