'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import UpgradePrompt from '@/components/UpgradePrompt';

interface Post {
  id: string;
  content: string;
  tone: string;
  type: string;
  length: string;
  createdAt: string;
}

interface Usage {
  tier: string;
  used: number;
  limit: number;
  remaining: number;
  month: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [type, setType] = useState('story');
  const [length, setLength] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showGenerated, setShowGenerated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.push('/auth/login');
      }
    };

    checkAuth();
    fetchPosts();
    fetchUsage();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchUsage = async () => {
    try {
      const res = await fetch('/api/usage');
      if (res.ok) {
        const data = await res.json();
        setUsage(data);
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setGenerating(true);

    if (!topic.trim()) {
      setError('Please enter a topic or idea');
      setGenerating(false);
      return;
    }

    try {
      // Check if limit reached
      if (usage && usage.used >= usage.limit) {
        setShowUpgrade(true);
        setGenerating(false);
        return;
      }

      const res = await fetch('/api/posts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone, type, length }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setShowUpgrade(true);
        } else {
          setError(data.error || 'Failed to generate posts');
        }
        setGenerating(false);
        return;
      }

      setGeneratedPosts(data.posts);
      setShowGenerated(true);
      setTopic('');
      await fetchPosts();
      await fetchUsage();
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (!usage) {
    return (
      <>
        <Head>
          <title>Dashboard - FounderPostAI</title>
        </Head>
        <Header />
        <div className="text-center py-12">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - FounderPostAI</title>
      </Head>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Usage Stats */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Your Tier</p>
              <p className="text-2xl font-bold capitalize">
                {usage.tier} — {usage.limit} posts/month
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Usage</p>
              <div className="flex items-end gap-4">
                <p className="text-2xl font-bold">{usage.used} used</p>
                <div className="flex-1 bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (usage.used / usage.limit) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {usage.tier === 'free' && (
            <button
              onClick={() => setShowUpgrade(true)}
              className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-bold"
            >
              Upgrade to Pro (50 posts/month for $9)
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Generate Posts</h2>

              {error && (
                <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic or Idea
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="E.g., How I built my first SaaS to $10k MRR"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="funny">Funny</option>
                    <option value="thought-leadership">
                      Thought-Leadership
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="story">Story</option>
                    <option value="tips">Tips</option>
                    <option value="questions">Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="short">Short (280 chars)</option>
                    <option value="medium">Medium (500 chars)</option>
                    <option value="long">Long (1000+ chars)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50"
                >
                  {generating ? 'Generating...' : 'Generate 5 Posts'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
                <p className="mb-2">💡 <strong>Pro tip:</strong> The more specific your topic, the better the posts.</p>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="lg:col-span-2">
            {showGenerated && generatedPosts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6">Generated Variations</h3>
                <div className="space-y-4">
                  {generatedPosts.map((post, index) => (
                    <PostCard
                      key={index}
                      content={post}
                      tone={tone}
                      type={type}
                      length={length}
                    />
                  ))}
                </div>
              </div>
            )}

            {posts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Post History</h3>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      content={post.content}
                      tone={post.tone}
                      type={post.type}
                      length={post.length}
                    />
                  ))}
                </div>
              </div>
            )}

            {!showGenerated && posts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-4">No posts yet. Generate your first one!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showUpgrade && (
        <UpgradePrompt
          used={usage.used}
          limit={usage.limit}
          onClose={() => setShowUpgrade(false)}
        />
      )}
    </>
  );
}