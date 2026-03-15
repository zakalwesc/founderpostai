import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const TONE_DESCRIPTIONS: Record<string, string> = {
  professional: 'authoritative, polished, business-oriented, data-driven',
  casual: 'friendly, conversational, approachable, relatable',
  funny: 'humorous, witty, light-hearted, entertaining with a business point',
  'thought-leadership':
    'visionary, insightful, challenging conventional wisdom, forward-thinking',
};

const TYPE_DESCRIPTIONS: Record<string, string> = {
  story: 'a personal story or narrative with a clear lesson or takeaway',
  tips: 'actionable tips or advice in a list or structured format',
  questions: 'an engaging question or poll to spark conversation and comments',
  announcement: 'an exciting announcement or milestone worth celebrating',
  insight: 'a surprising insight, statistic, or observation about your industry',
};

const LENGTH_DESCRIPTIONS: Record<string, string> = {
  short: 'Keep it under 280 characters. Punchy, concise, one clear idea.',
  medium: 'Aim for 400-500 characters. Balanced detail with a clear CTA.',
  long: 'Write 900-1100 characters. Tell a complete story with depth and nuance.',
};

export async function generatePostVariations(
  topic: string,
  tone: string,
  postType: string,
  length: string
): Promise<string[]> {
  const toneDesc = TONE_DESCRIPTIONS[tone] || tone;
  const typeDesc = TYPE_DESCRIPTIONS[postType] || postType;
  const lengthDesc = LENGTH_DESCRIPTIONS[length] || length;

  const systemPrompt = `You are an expert LinkedIn content strategist who has helped hundreds of founders and executives build massive audiences on LinkedIn. You understand the platform's algorithm deeply, know what drives engagement, and write posts that feel authentic while achieving business goals.

Your posts:
- Start with a strong hook that stops the scroll (never start with "I")
- Use short paragraphs (1-3 lines max) for mobile readability
- Include strategic line breaks for visual rhythm
- End with a clear call-to-action or thought-provoking question
- Feel human and authentic, not like AI-generated content
- Use LinkedIn-specific formatting (line breaks, emojis sparingly when appropriate)
- Never use hashtags more than 3, place them at the end if used`;

  const userPrompt = `Generate exactly 5 different LinkedIn post variations about the following topic.

Topic: ${topic}
Tone: ${toneDesc}
Post Type: ${typeDesc}
Length: ${lengthDesc}

IMPORTANT REQUIREMENTS:
1. Generate exactly 5 variations, each distinctly different in approach and angle
2. Each variation must strictly follow the length requirement: ${lengthDesc}
3. Separate each variation with exactly "---" on its own line
4. Do NOT number the variations or add any labels
5. Make each one feel like a real human wrote it, not AI
6. Each variation should have a completely different hook and angle

Generate the 5 variations now:`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  const rawText = content.text.trim();
  const variations = rawText
    .split(/\n---\n/)
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  // Pad to 5 if we got fewer
  while (variations.length < 5) {
    variations.push(variations[variations.length - 1] || 'Could not generate variation.');
  }

  return variations.slice(0, 5);
}
