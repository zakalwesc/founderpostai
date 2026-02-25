# FounderPostAI

A SaaS application that generates LinkedIn posts optimized for engagement. Stop staring at a blank page and generate 5 variations in seconds.

## Features

- **LinkedIn-Optimized Generation**: Not generic ChatGPT. Specific tones, post types, and lengths built in.
- **Frictionless One-Click Generation**: No prompt engineering. Just topic, tone, type, and length.
- **5 Variations in Seconds**: Compare multiple approaches instantly.
- **Free Tier**: 2 posts/month included.
- **Pro Tier**: $9/month for 50 posts/month (via Stripe).
- **Post History & Usage Tracking**: Dashboard shows generated posts and monthly usage stats.
- **One-Click Copy**: Copy any variation to clipboard instantly.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, CSS Modules
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **AI**: Anthropic Claude API
- **Payments**: Stripe
- **Auth**: JWT + bcrypt
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- Anthropic API key

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

Edit `.env.local` with your actual credentials:
```
DATABASE_URL="postgresql://user:password@localhost:5432/founderpostai"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
ANTHROPIC_API_KEY="sk-ant-..."
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database Setup on Vercel

Use Vercel Postgres or any PostgreSQL provider. Set the `DATABASE_URL` in your Vercel environment variables.

## Project Structure

```
src/
├── pages/
│   ├── api/
│   │   ├── auth/ (signup, login, logout)
│   │   ├── posts/ (generate, list)
│   │   ├── stripe/ (checkout sessions)
│   │   └── webhooks/ (stripe events)
│   ├── index.tsx (landing page)
│   ├── dashboard.tsx (main app)
│   ├── upgrade.tsx (upgrade page)
│   └── auth/ (signup, login)
├── styles/ (CSS modules)
prisma/
└── schema.prisma (database schema)
```

## API Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/posts/generate` - Generate 5 post variations
- `GET /api/posts/list` - Get user's post history and usage
- `POST /api/stripe/create-checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Key Features Explained

### Post Generation

Users input:
- **Topic/Idea** (textarea): What they want to write about
- **Tone** (dropdown): professional, casual, funny, or thought-leadership
- **Post Type** (dropdown): story, tips, or questions
- **Length** (dropdown): short (280 chars), medium (500 chars), or long (1000+ chars)

The Claude API generates 5 distinct variations optimized for LinkedIn engagement.

### Usage Tracking

- Free users: 2 posts/month
- Pro users: 50 posts/month
- Usage resets on the 1st of each month
- Dashboard shows current usage and remaining posts

### Stripe Integration

- Stripe Checkout for Pro tier subscription
- Webhook handler for subscription events
- Automatic tier upgrade on successful payment
- Automatic tier downgrade on cancellation

## Development Tips

### Running Migrations

After schema changes:
```bash
npx prisma migrate dev --name description_of_change
```

### Prisma Studio

View and edit database:
```bash
npx prisma studio
```

### Testing Stripe Webhooks Locally

Use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
stripe trigger payment_intent.succeeded
```

## License

MIT

## Support

For issues or questions, please open a GitHub issue.
