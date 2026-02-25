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

const TIER_LIMITS = {
  free: 2,
  pro: 50,
};

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

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentMonth = new Date().toISOString().slice(0, 7);
    const usage = await prisma.usage.findUnique({
      where: { userId_month: { userId: user.id, month: currentMonth } },
    });

    const currentCount = usage?.count || 0;
    const limit = TIER_LIMITS[user.tier as keyof typeof TIER_LIMITS] || 2;

    return res.status(200).json({
      tier: user.tier,
      used: currentCount,
      limit,
      remaining: Math.max(0, limit - currentCount),
      month: currentMonth,
    });
  } catch (error) {
    console.error('Usage error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}