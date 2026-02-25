import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getDb } from '@/lib/db';

type ResponseData = {
  tier?: string;
  posts_used?: number;
  posts_limit?: number;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
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

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthlyUsage = db
      .prepare(
        'SELECT COUNT(*) as count FROM posts WHERE user_id = ? AND created_at >= ?'
      )
      .get(user.id, monthStart.toISOString()) as any;

    const postLimits = { free: 2, pro: 50 };
    const limit = postLimits[user.tier as 'free' | 'pro'];

    return res.status(200).json({
      tier: user.tier,
      posts_used: monthlyUsage.count,
      posts_limit: limit,
    });
  } catch (error) {
    console.error('Usage error:', error);
    return res.status(500).json({ message: 'Failed to fetch usage' });
  }
}