# FounderPostAI

Generate LinkedIn posts that actually get engagement. Built specifically for founders.

## Features

- 🚀 Generate 5 LinkedIn post variations in seconds
- 🎛️ Control tone, post type, and length
- 📊 Usage tracking (free: 2/month, pro: 50/month)
- 💳 Stripe subscription for Pro plan ($9/month)
- 📋 Copy to clipboard
- 📁 Post history
- 🔐 Email/password auth via NextAuth

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env.local` file:

```env
ANTHROPIC_API_KEY=sk-ant-your_key
NEXTAUTH_SECRET=your_random_32char_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
STRIPE_PRO_PRICE_ID=price_your_price_id
```

### 3. Create Stripe Product

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create a product: "FounderPostAI Pro"
3. Set price: $9.00/month recurring
4. Copy the price ID to `STRIPE_PRO_PRICE_ID`

### 4. Set up Stripe Webhook

1. In Stripe Dashboard → Webhooks → Add endpoint
2. URL: `https://yourdomain.com/api/webhooks/stripe`
3. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
   - `invoice.payment_failed`
4. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Deploy to Vercel

```bash
npx vercel --prod
```

Add all environment variables in Vercel project settings.

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js
- **AI**: Anthropic Claude API
- **Payments**: Stripe
- **Storage**: In-memory (upgrade to PostgreSQL for production)

## Notes

- In-memory storage resets on server restart. For production, use a real database (Vercel Postgres, Supabase, PlanetScale)
- The free tier allows 2 posts/month, Pro allows 50/month
