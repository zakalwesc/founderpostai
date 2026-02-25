import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PostGenerator from '@/components/PostGenerator';
import UsageStats from '@/components/UsageStats';
import PostHistory from '@/components/PostHistory';

type Tab = 'generate' | 'history';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('generate');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-linkedin"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {(session.user as any)?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600">Generate LinkedIn posts that actually get engagement</p>
        </div>

        <UsageStats refreshTrigger={refreshTrigger} />

        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'generate'
                ? 'text-linkedin border-linkedin'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Generate Post
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'history'
                ? 'text-linkedin border-linkedin'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Post History
          </button>
        </div>

        {activeTab === 'generate' && (
          <PostGenerator onPostGenerated={() => setRefreshTrigger(prev => prev + 1)} />
        )}
        {activeTab === 'history' && <PostHistory refreshTrigger={refreshTrigger} />}
      </div>
    </DashboardLayout>
  );
}
