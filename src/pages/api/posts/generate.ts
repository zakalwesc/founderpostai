import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getDb } from '@/lib/db';
import { generatePostVariations } from '@/lib/claude';

type ResponseData = {
  message?: string;
  posts?: string[];
  error?: string;
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

  const { topic, tone, postType, length } = req.body;

  if (!topic || !tone || !postType || !length) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get((session.user as any).email) as any;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const postLimits = { free: 2, pro: 50 };
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthlyUsage = db
      .prepare(
        'SELECT COUNT(*) as count FROM posts WHERE user_id = ? AND created_at >= ?'
      )
      .get(user.id, monthStart.toISOString()) as any;

    const limit = postLimits[user.tier as 'free' | 'pro'];
    if (monthlyUsage.count >= limit) {
      return res.status(403).json({
        error: `You've reached your monthly limit of ${limit} posts. Upgrade to Pro for 50 posts/month.`,
      });
    }

    const posts = await generatePostVariations({
      topic,
      tone,
      postType,
      length,
    });

    const timestamp = new Date().toISOString();
    posts.forEach((post) => {
      db.prepare(
        'INSERT INTO posts (user_id, content, topic, tone, post_type, length, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).run(user.id, post, topic, tone, postType, length, timestamp);
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Generate posts error:', error);
    return res.status(500).json({ message: 'Failed to generate posts' });
  }
}