/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51T4TD3CedoFOFPt29c2zcTXjpSg6huTutW8ZlqgjeDlpex1v7ezgbADjDfANH1AyZ4GfkpC8ttg3XzIOxGxa9NNI00D2vFRysw',
  },
};

module.exports = nextConfig;