import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import stripe from '@/lib/stripe';
import { getDb } from '@/lib/db';

type ResponseData = {
  url?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get((session.user as any).email) as any;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'FounderPostAI Pro',
              description: '50 LinkedIn posts per month',
            },
            unit_amount: 900,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard?upgrade=success`,
      cancel_url: `${baseUrl}/dashboard`,
      metadata: {
        userId: user.id.toString(),
        email: user.email,
      },
    });

    return res.status(200).json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ message: 'Failed to create checkout session' });
  }
}