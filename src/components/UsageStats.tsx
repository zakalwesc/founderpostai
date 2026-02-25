import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

interface UsageStatsProps {
  refreshTrigger: number;
}

interface UsageData {
  tier: string;
  posts_used: number;
  posts_limit: number;
}

export default function UsageStats({ refreshTrigger }: UsageStatsProps) {
  const { data: session } = useSession();
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await axios.get('/api/user/usage');
        setUsage(response.data);
      } catch (error) {
        console.error('Failed to fetch usage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [refreshTrigger]);

  if (loading || !usage) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  const usagePercent = Math.round((usage.posts_used / usage.posts_limit) * 100);
  const remaining = usage.posts_limit - usage.posts_used;

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Monthly Usage</h2>
          <p className="text-gray-600">{usage.tier === 'free' ? 'Free Plan' : 'Pro Plan'}</p>
        </div>
        {usage.tier === 'free' && remaining === 0 && (
          <Link
            href="/api/stripe/create-checkout"
            className="px-6 py-2 bg-linkedin text-white rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Upgrade to Pro
          </Link>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-semibold text-gray-900">
            {usage.posts_used} / {usage.posts_limit} posts used
          </p>
          <p className="text-sm text-gray-600">{remaining} remaining</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              usagePercent >= 100 ? 'bg-red-500' : usagePercent >= 80 ? 'bg-warning' : 'bg-success'
            }`}
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
          ></div>
        </div>

        {usage.tier === 'free' && remaining <= 1 && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 font-medium mb-2">Almost out of posts this month!</p>
            <p className="text-blue-800 text-sm mb-4">
              Upgrade to Pro for 50 posts/month + priority support.
            </p>
            <button
              onClick={async () => {
                try {
                  const response = await axios.post('/api/stripe/create-checkout');
                  if (response.data.sessionId) {
                    const stripe = await (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
                    await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
                  }
                } catch (error) {
                  console.error('Checkout error:', error);
                }
              }}
              className="px-4 py-2 bg-linkedin text-white rounded-lg hover:bg-blue-700 font-semibold transition"
            >
              Upgrade Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
