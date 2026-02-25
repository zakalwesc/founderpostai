import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

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

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword(password),
        tier: 'free',
      },
    });

    const token = generateToken(user.id);

    res.setHeader(
      'Set-Cookie',
      `token=${token}; Path=/; Max-Age=${30 * 24 * 60 * 60}; HttpOnly; Secure; SameSite=Strict`
    );

    return res.status(201).json({
      user: { id: user.id, email: user.email, tier: user.tier },
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}