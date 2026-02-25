import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Post {
  id: number;
  content: string;
  topic: string;
  tone: string;
  post_type: string;
  length: string;
  created_at: string;
}

interface PostHistoryProps {
  refreshTrigger: number;
}

export default function PostHistory({ refreshTrigger }: PostHistoryProps) {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/posts/history');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [refreshTrigger]);

  const handleCopy = (post: Post) => {
    navigator.clipboard.writeText(post.content);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No posts yet. Generate your first post to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">
                {formatDate(post.created_at)}
              </p>
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-linkedin/10 text-linkedin rounded-full text-xs font-semibold">
                  {post.tone}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                  {post.post_type}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                  {post.length}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCopy(post)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition ${
                copiedId === post.id
                  ? 'bg-success text-white'
                  : 'bg-linkedin/10 text-linkedin hover:bg-linkedin hover:text-white'
              }`}
            >
              {copiedId === post.id ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
