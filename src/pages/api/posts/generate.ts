import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Anthropic from '@anthropic-ai/sdk';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const anthropic = new Anthropic();

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
  if (req.method !== 'POST') {
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

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { topic, tone, postType, length } = req.body;
    if (!topic || !tone || !postType || !length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const monthYear = new Date().toISOString().slice(0, 7);
    const usage = await prisma.usage.findUnique({
      where: { userId: user.id },
    });

    const limit = user.tier === 'pro' ? 50 : 2;
    if (usage && usage.postsUsed >= limit) {
      return res.status(403).json({ error: 'Monthly limit reached. Upgrade to Pro.' });
    }

    const lengthMap: { [key: string]: string } = {
      short: '280 characters',
      medium: '500 characters',
      long: '1000+ characters',
    };

    const prompt = `You are a LinkedIn post expert optimized for engagement. Generate 5 distinct LinkedIn post variations for founders and professionals.

Topic: ${topic}
Tone: ${tone}
Post Type: ${postType}
Length: ${lengthMap[length]}

Requirements:
- Each post must be optimized for LinkedIn algorithm
- Use appropriate hashtags (3-5 max)
- Match the specified tone exactly
- For story posts: include narrative arc, personal insight, or lesson learned
- For tips posts: actionable, numbered or bulleted advice
- For questions posts: thought-provoking, engagement-focused
- Vary the approach and structure across all 5 variations
- Do NOT use generic ChatGPT phrases
- Be authentic and specific

Format each variation as plain text, separated by "---\n\n".

Generate now:`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      return res.status(500).json({ error: 'Unexpected API response' });
    }

    const variations = content.text
      .split('---')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    const post = await prisma.post.create({
      data: {
        userId: user.id,
        topic,
        tone,
        postType,
        length,
        variations,
      },
    });

    const currentUsage = await prisma.usage.findUnique({
      where: { userId: user.id },
    });

    if (currentUsage && currentUsage.monthYear === monthYear) {
      await prisma.usage.update({
        where: { userId: user.id },
        data: { postsUsed: currentUsage.postsUsed + 1 },
      });
    } else {
      await prisma.usage.update({
        where: { userId: user.id },
        data: { postsUsed: 1, monthYear },
      });
    }

    return res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Generation failed' });
  }
}
