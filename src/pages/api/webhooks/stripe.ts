import type { NextApiRequest, NextApiResponse } from 'next';
import stripe from '@/lib/stripe';
import { getDb } from '@/lib/db';
import type Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Read raw body without 'micro' dependency
function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
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
    return res.status(400).send(`Webhook Error: ${(error as Error).message}`);
  }

  const db = getDb();

  try {
    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const email = (subscription as any).metadata?.email || (subscription as any).customer_email;

      if (email) {
        db.prepare('UPDATE users SET tier = ? WHERE email = ?').run('pro', email);
        const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as any;
        if (user) {
          db.prepare(
            'INSERT INTO subscription_events (user_id, event_type, stripe_subscription_id, created_at) VALUES (?, ?, ?, ?)'
          ).run(user.id, event.type, subscription.id, new Date().toISOString());
        }
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const email = (subscription as any).metadata?.email || (subscription as any).customer_email;

      if (email) {
        db.prepare('UPDATE users SET tier = ? WHERE email = ?').run('free', email);
        const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as any;
        if (user) {
          db.prepare(
            'INSERT INTO subscription_events (user_id, event_type, stripe_subscription_id, created_at) VALUES (?, ?, ?, ?)'
          ).run(user.id, event.type, subscription.id, new Date().toISOString());
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
