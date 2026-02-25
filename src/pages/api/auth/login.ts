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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.NEXTAUTH_SECRET || 'secret', {
      expiresIn: '30d',
    });

    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=2592000`);
    return res.status(200).json({ user: { id: user.id, email: user.email, tier: user.tier } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Login failed' });
  }
}
