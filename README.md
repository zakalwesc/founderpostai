# FounderPostAI

LinkedIn post generation SaaS powered by Claude AI. Stop staring at a blank page and generate LinkedIn posts that actually get engagement.

## Features

- **One-Click Generation**: Generate 5 unique LinkedIn post variations in seconds
- **Optimized for LinkedIn**: Built specifically for LinkedIn, not generic ChatGPT output
- **Tone & Style Options**: Choose from professional, casual, funny, and thought-leadership tones
- **Post Type Selection**: Story posts, tips, questions, and more
- **Length Control**: Short (280 chars), medium (500 chars), or long (1000+ chars)
- **Free Tier**: 2 posts/month auto-enrolled
- **Pro Tier**: $9/month for 50 posts/month
- **Dashboard**: Track usage, view history, manage account
- **Copy-to-Clipboard**: One-click copying for instant sharing

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **AI**: Anthropic Claude API
- **Payments**: Stripe
- **Database**: SQLite (development) / PostgreSQL (production)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payments)
- Anthropic API key (for Claude)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/founderpostai.git
   cd founderpostai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your credentials:
   - `ANTHROPIC_API_KEY`: Get from https://console.anthropic.com
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: From Stripe dashboard
   - `STRIPE_SECRET_KEY`: From Stripe dashboard
   - `STRIPE_WEBHOOK_SECRET`: From Stripe dashboard
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

4. Run development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel

1. Push to GitHub
2. Import project to Vercel
3. Set environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your production domain)
   - `NEXT_PUBLIC_URL` (your production domain)
4. Deploy

## Environment Variables

Required for production:

- `ANTHROPIC_API_KEY`: Claude API key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook endpoint secret
- `NEXTAUTH_SECRET`: NextAuth.js session secret
- `NEXTAUTH_URL`: Your production domain
- `NEXT_PUBLIC_URL`: Your production domain
- `DATABASE_URL`: SQLite path or PostgreSQL connection string

## API Routes

- `POST /api/auth/signup`: User registration
- `POST /api/auth/[...nextauth]`: NextAuth endpoints
- `POST /api/posts/generate`: Generate post variations (requires auth)
- `GET /api/posts/history`: Get user's post history (requires auth)
- `GET /api/user/usage`: Get monthly usage stats (requires auth)
- `POST /api/stripe/create-checkout`: Create Stripe checkout session
- `POST /api/webhooks/stripe`: Stripe webhook handler

## License

MIT