import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        passwordHash: hash,
        tier: 'free',
      },
    });

    await prisma.usage.create({
      data: {
        userId: user.id,
        postsUsed: 0,
        monthYear: new Date().toISOString().slice(0, 7),
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.NEXTAUTH_SECRET || 'secret', {
      expiresIn: '30d',
    });

    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=2592000`);
    return res.status(201).json({ user: { id: user.id, email: user.email, tier: user.tier } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Signup failed' });
  }
}
