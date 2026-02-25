import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface PostGeneratorProps {
  onPostGenerated: () => void;
}

export default function PostGenerator({ onPostGenerated }: PostGeneratorProps) {
  const { data: session } = useSession();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'funny' | 'thought-leadership'>('professional');
  const [postType, setPostType] = useState<'story' | 'tips' | 'questions' | 'announcement' | 'insight'>('story');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPosts([]);
    setLoading(true);

    try {
      const response = await axios.post('/api/posts/generate', {
        topic,
        tone,
        postType,
        length,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setPosts(response.data.posts);
        onPostGenerated();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (post: string, index: number) => {
    navigator.clipboard.writeText(post);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Generator Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate New Posts</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
            {error.includes('Upgrade') && (
              <Link href="#pricing" className="text-red-600 hover:underline mt-2 inline-block font-semibold">
                Upgrade to Pro →
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              What's your post idea?
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., Just launched my new product, lessons from my first startup failure, best practices for remote teams..."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent resize-none h-28"
            />
            <p className="text-sm text-gray-500 mt-2">The more specific, the better the results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="funny">Funny</option>
                <option value="thought-leadership">Thought Leadership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Post Type
              </label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent"
              >
                <option value="story">Story</option>
                <option value="tips">Tips</option>
                <option value="questions">Questions</option>
                <option value="announcement">Announcement</option>
                <option value="insight">Insight</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Length
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-linkedin focus:border-transparent"
              >
                <option value="short">Short (280 chars)</option>
                <option value="medium">Medium (500 chars)</option>
                <option value="long">Long (1000+ chars)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !topic}
            className="w-full bg-linkedin hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⚡</span>
                Generating 5 variations...
              </>
            ) : (
              'Generate Posts'
            )}
          </button>
        </form>
      </div>

      {/* Generated Posts */}
      {posts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your 5 Post Variations</h2>
          <p className="text-gray-600">Pick your favorite and copy to LinkedIn. Each is optimized for maximum engagement.</p>

          {posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-linkedin hover:shadow-md transition">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-gray-900 whitespace-pre-wrap mb-4">{post}</p>
                  <p className="text-sm text-gray-500">Variation {idx + 1} of 5</p>
                </div>
                <button
                  onClick={() => handleCopy(post, idx)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition ${
                    copiedIndex === idx
                      ? 'bg-success text-white'
                      : 'bg-linkedin/10 text-linkedin hover:bg-linkedin hover:text-white'
                  }`}
                >
                  {copiedIndex === idx ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
