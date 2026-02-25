import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GeneratePostVariationsInput {
  topic: string;
  tone: 'professional' | 'casual' | 'funny' | 'thought-leadership';
  postType: 'story' | 'tips' | 'questions' | 'announcement' | 'insight';
  length: 'short' | 'medium' | 'long';
}

const lengthGuides = {
  short: '280 characters',
  medium: '500 characters',
  long: '1000+ characters',
};

const toneDescriptions = {
  professional: 'formal and businesslike',
  casual: 'friendly and conversational',
  funny: 'humorous and witty',
  'thought-leadership': 'insightful and authoritative',
};

const postTypeDescriptions = {
  story: 'a personal or business story with a lesson',
  tips: 'actionable tips or best practices',
  questions: 'engaging questions to spark discussion',
  announcement: 'an important announcement or update',
  insight: 'a unique insight or perspective',
};

export async function generatePostVariations({
  topic,
  tone,
  postType,
  length,
}: GeneratePostVariationsInput): Promise<string[]> {
  const prompt = `You are an expert LinkedIn copywriter who creates posts that drive engagement.

Generate exactly 5 unique LinkedIn post variations optimized for maximum engagement.

Requirements:
- Topic: ${topic}
- Tone: ${toneDescriptions[tone]}
- Post Type: ${postTypeDescriptions[postType]}
- Target Length: Around ${lengthGuides[length]}
- Include relevant emojis (2-4 per post) for visual appeal
- Use line breaks strategically for readability
- Each post should have a different angle or perspective
- Include 2-3 relevant hashtags at the end
- Focus on driving likes, comments, and shares
- Write authentic, specific content (not generic)
- Posts should feel personal and genuine

Return ONLY the 5 posts, numbered 1-5, separated by blank lines. Do not include any other text, explanations, or metadata.`;

  try {
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
      .split(/\n\n+/)  // Split on blank lines
      .map((post) => post.replace(/^\d+\.\s*/, '').trim())
      .filter((post) => post.length > 0);

    // Return exactly 5 posts
    return posts.slice(0, 5);
  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error('Failed to generate posts');
  }
}