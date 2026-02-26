import type { NextApiRequest, NextApiResponse } from 'next';
import stripe from '@/lib/stripe';
import { getUserByEmail, getUserByStripeCustomerId, updateUserTier, updateUserByEmail, createSubscriptionEvent } from '@/lib/db';
import type Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) return null;
    return (customer as Stripe.Customer).email || null;
  } catch {
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await getRawBody(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error) {
    console.error('Webhook signature error:', error);
    return res.status(400).send(`Webhook Error: ${(error as Error).message}`);
  }

  try {
    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated'
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // Try to find user by metadata email first, then by customer ID lookup
      let email: string | null =
        (subscription as any).metadata?.email || null;

      if (!email) {
        email = await getCustomerEmail(customerId);
      }

      if (email) {
        updateUserByEmail(email, { tier: 'pro', stripeCustomerId: customerId, stripeSubscriptionId: subscription.id });
        const user = getUserByEmail(email);
        if (user) {
          createSubscriptionEvent(user.id, event.type, subscription.id);
        }
      } else {
        // Try by customer ID
        const user = getUserByStripeCustomerId(customerId);
        if (user) {
          updateUserTier(user.id, 'pro');
          createSubscriptionEvent(user.id, event.type, subscription.id);
        }
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      let email: string | null =
        (subscription as any).metadata?.email || null;

      if (!email) {
        email = await getCustomerEmail(customerId);
      }

      if (email) {
        updateUserByEmail(email, { tier: 'free' });
        const user = getUserByEmail(email);
        if (user) {
          createSubscriptionEvent(user.id, event.type, subscription.id);
        }
      } else {
        const user = getUserByStripeCustomerId(customerId);
        if (user) {
          updateUserTier(user.id, 'free');
          createSubscriptionEvent(user.id, event.type, subscription.id);
        }
      }
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.metadata?.email || session.customer_email;
      const customerId = session.customer as string;

      if (email) {
        updateUserByEmail(email, { tier: 'pro', stripeCustomerId: customerId });
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
