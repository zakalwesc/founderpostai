import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Dashboard.module.css';

interface Post {
  id: string;
  topic: string;
  tone: string;
  postType: string;
  length: string;
  variations: string[];
  createdAt: string;
}

interface Usage {
  postsUsed: number;
  monthYear: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
    
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetchUserData();
  }, [router]);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/posts/list');
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      setPosts(data.posts);
      setUsage(data.usage);
      setUser({ tier: 'free' }); // Placeholder
      setLoading(false);
    } catch (err) {
      router.push('/auth/login');
    }
  };

  if (loading || !user) return null;

  const limit = user.tier === 'pro' ? 50 : 2;
  const postsUsed = usage?.postsUsed || 0;
  const postsRemaining = Math.max(0, limit - postsUsed);

  return (
    <>
      <Head>
        <title>Dashboard - FounderPostAI</title>
      </Head>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navBrand}>FounderPostAI</div>
          <div className={styles.navRight}>
            <span className={styles.userInfo}>{user.email}</span>
            <button onClick={() => router.push('/auth/logout')} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </nav>

        <div className={styles.content}>
          <div className={styles.header}>
            <h1>LinkedIn Post Generator</h1>
            <div className={styles.usageCard}>
              <div className={styles.usageText}>
                <p className={styles.usageLabel}>{user.tier.toUpperCase()} Plan</p>
                <p className={styles.usageNumbers}>
                  {postsUsed} / {limit} posts used this month
                </p>
                <div className={styles.usageBar}>
                  <div
                    className={styles.usageBarFilled}
                    style={{ width: `${(postsUsed / limit) * 100}%` }}
                  />
                </div>
              </div>
              {user.tier === 'free' && postsRemaining === 0 ? (
                <button
                  className={styles.upgradeBtn}
                  onClick={() => router.push('/upgrade')}
                >
                  Upgrade to Pro
                </button>
              ) : user.tier === 'free' && postsRemaining <= 1 ? (
                <button
                  className={styles.upgradeBtn}
                  onClick={() => router.push('/upgrade')}
                >
                  Upgrade (1 post left)
                </button>
              ) : null}
            </div>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'generator' ? styles.active : ''}`}
              onClick={() => setActiveTab('generator')}
            >
              Generate Post
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'history' ? styles.active : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Post History
            </button>
          </div>

          {activeTab === 'generator' && (
            <GeneratorTab limit={limit} postsUsed={postsUsed} onPostGenerated={fetchUserData} />
          )}
          {activeTab === 'history' && <HistoryTab posts={posts} />}
        </div>
      </div>
    </>
  );
}

function GeneratorTab({
  limit,
  postsUsed,
  onPostGenerated,
}: {
  limit: number;
  postsUsed: number;
  onPostGenerated: () => void;
}) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [postType, setPostType] = useState('story');
  const [length, setLength] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const canGenerate = postsUsed < limit;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canGenerate) {
      router.push('/upgrade');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/posts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone, postType, length }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed');
      }

      const data = await res.json();
      setResult(data.post);
      setTopic('');
      onPostGenerated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.generatorSection}>
      <form onSubmit={handleGenerate} className={styles.generatorForm}>
        <div className={styles.formGroup}>
          <label htmlFor="topic">Topic or Idea</label>
          <textarea
            id="topic"
            placeholder="What do you want to write about? E.g., 'Just shipped a new feature that cuts customer onboarding time by 40%'"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            disabled={!canGenerate}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="tone">Tone</label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              disabled={!canGenerate}
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="funny">Funny</option>
              <option value="thought-leadership">Thought Leadership</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="postType">Post Type</label>
            <select
              id="postType"
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              disabled={!canGenerate}
            >
              <option value="story">Story</option>
              <option value="tips">Tips</option>
              <option value="questions">Questions</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="length">Length</label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              disabled={!canGenerate}
            >
              <option value="short">Short (280 chars)</option>
              <option value="medium">Medium (500 chars)</option>
              <option value="long">Long (1000+ chars)</option>
            </select>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {!canGenerate && (
          <div className={styles.error}>
            Monthly limit reached. <a href="/upgrade">Upgrade to Pro</a> for 50 posts/month.
          </div>
        )}

        <button type="submit" disabled={loading || !canGenerate} className={styles.generateBtn}>
          {loading ? 'Generating 5 variations...' : 'Generate 5 Variations'}
        </button>
      </form>

      {result && <ResultSection post={result} />}
    </div>
  );
}

function ResultSection({ post }: { post: Post }) {
  const [copied, setCopied] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className={styles.resultSection}>
      <h2>5 LinkedIn Post Variations</h2>
      <div className={styles.variationsGrid}>
        {post.variations.map((variation, index) => (
          <div key={index} className={styles.variationCard}>
            <p className={styles.variationText}>{variation}</p>
            <button
              className={styles.copyBtn}
              onClick={() => copyToClipboard(variation, index)}
            >
              {copied === index ? '✓ Copied' : 'Copy to Clipboard'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryTab({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.historySection}>
      <h2>Post History</h2>
      {posts.length === 0 ? (
        <p className={styles.emptyState}>No posts generated yet. Start creating!</p>
      ) : (
        <div className={styles.postsList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postMeta}>
                <p className={styles.postTopic}>
                  <strong>Topic:</strong> {post.topic}
                </p>
                <p className={styles.postDetails}>
                  <strong>Tone:</strong> {post.tone} | <strong>Type:</strong> {post.postType} |
                  <strong>Length:</strong> {post.length}
                </p>
                <p className={styles.postDate}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                className={styles.viewBtn}
                onClick={() => {
                  // Could expand to show variations inline
                }}
              >
                View Variations
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
