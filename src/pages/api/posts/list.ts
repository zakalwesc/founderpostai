import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET || 'secret') as JwtPayload;
  } catch {
    return null;
  }
}

function getCookie(cookieString: string, name: string): string | null {
  const cookies = cookieString.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) return value;
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
    const cookieHeader = req.headers.cookie || '';
    const token = getCookie(cookieHeader, 'token');
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const posts = await prisma.post.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' },
    });

    const usage = await prisma.usage.findUnique({
      where: { userId: payload.userId },
    });

    return res.status(200).json({ posts, usage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
