'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const userEmail = (session?.user as any)?.email || '';
  const userInitials = userEmail.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-linkedin">
            FounderPostAI
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-linkedin to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {userInitials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
}