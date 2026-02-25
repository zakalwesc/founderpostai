import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';
import { verifyToken } from '@/lib/auth';

function getTokenFromCookie(req: NextApiRequest): string | null {
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const cookies = cookie.split(';');
  for (const c of cookies) {
    const [key, value] = c.split('=');
    if (key.trim() === 'token') {
      return value?.trim() || null;
    }
  }
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = getTokenFromCookie(req);
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const posts = await prisma.post.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}