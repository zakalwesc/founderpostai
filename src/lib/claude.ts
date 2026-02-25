import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generatePostVariations(
  topic: string,
  tone: string,
  type: string,
  length: string
): Promise<string[]> {
  const lengthGuide = {
    short: '280 characters',
    medium: '500 characters',
    long: '1000+ characters',
  };

  const prompt = `Generate exactly 5 different LinkedIn post variations based on these parameters:

Topic: ${topic}
Tone: ${tone}
Type: ${type}
Length: ${lengthGuide[length as keyof typeof lengthGuide] || '500 characters'}

Instructions:
- Each variation must be distinct and unique
- Optimize for LinkedIn engagement (no hashtags at the beginning)
- Match the specified tone exactly
- If type is 'story', create narrative posts
- If type is 'tips', create actionable advice
- If type is 'questions', create thought-provoking questions
- Respect the character limit
- Make each variation compelling and authentic

Return ONLY the 5 posts, numbered 1-5, separated by double newlines. Do not include explanations or meta-text.`;

  const message = await client.messages.create({
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
    throw new Error('Unexpected response type from Claude');
  }

  const posts = content.text
    .split('\n\n')
    .filter((p) => p.trim().length > 0)
    .map((p) => p.replace(/^\d+\.\s*/, '').trim());

  return posts.slice(0, 5);
}