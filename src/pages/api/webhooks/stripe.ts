import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '@/lib/stripe';
import prisma from '@/lib/db';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const config = {
  api: {
    bodyParser: {
      raw: true,
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sig = req.headers['stripe-signature'] as string;
    const body = (req.body as any).toString('utf8');

    let event;

    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body);
    }

    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'customer.subscription.updated'
    ) {
      const session = event.data.object;
      const userId = session.client_reference_id;

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { tier: 'pro' },
        });
      }
    }

    if (
      event.type === 'customer.subscription.deleted' ||
      event.type === 'invoice.payment_failed'
    ) {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      if (customerId) {
        const invoices = await stripe.invoices.list({
          customer: customerId,
          limit: 1,
        });

        if (invoices.data.length > 0) {
          const metadata = invoices.data[0].metadata;
          if (metadata?.userId) {
            await prisma.user.update({
              where: { id: metadata.userId },
              data: { tier: 'free' },
            });
          }
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({ error: 'Webhook error' });
  }
}