import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getDb } from '@/lib/db';

type Post = {
  id: number;
  content: string;
  topic: string;
  tone: string;
  post_type: string;
  length: string;
  created_at: string;
};

type ResponseData = {
  posts?: Post[];
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
    const user = db.prepare('SELECT id FROM users WHERE email = ?').get(session.user.email) as any;

    const posts = db
      .prepare(
        'SELECT id, content, topic, tone, post_type, length, created_at FROM posts WHERE user_id = ? ORDER BY created_at DESC LIMIT 50'
      )
      .all(user.id) as Post[];

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('History error:', error);
    return res.status(500).json({ message: 'Failed to fetch history' });
  }
}
