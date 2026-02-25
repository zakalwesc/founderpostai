# FounderPostAI

Generate engaging LinkedIn posts in seconds with AI-optimized variations.

## Features

- **LinkedIn-Optimized**: Not generic ChatGPT — built specifically for LinkedIn engagement
- **One-Click Generation**: Select tone, type, and length. Get 5 variations instantly
- **Customizable Options**:
  - Tones: Professional, Casual, Funny, Thought-Leadership
  - Types: Story, Tips, Questions
  - Lengths: Short (280), Medium (500), Long (1000+)
- **Free Tier**: 2 posts/month
- **Pro Tier**: $9/month for 50 posts/month
- **Post History**: Track all generated posts
- **Usage Stats**: Monitor monthly quota

## Tech Stack

- **Framework**: Next.js 14
- **Database**: SQLite (Prisma ORM)
- **Authentication**: JWT + bcrypt
- **AI**: Anthropic Claude API
- **Payments**: Stripe
- **Deployment**: Vercel

## Setup

### Prerequisites

- Node.js 18+
- Stripe account (for payments)
- Anthropic API key (for Claude)

### Installation

1. Clone and install:
```bash
git clone https://github.com/yourusername/founderpostai.git
cd founderpostai
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Fill in `.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
ANTHROPIC_API_KEY=sk-ant-...
JWT_SECRET=your_secure_random_string
DATABASE_URL=file:./prisma/dev.db
```

4. Set up database:
```bash
npx prisma migrate dev --name init
```

5. Run dev server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment

### Vercel

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## API Endpoints

- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login
- `POST /api/posts/generate` - Generate post variations
- `GET /api/posts` - Get post history
- `GET /api/usage` - Get usage stats
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Stripe webhook handler

## License

MIT