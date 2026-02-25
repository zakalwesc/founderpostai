'use client';

import { useState } from 'react';

interface PostCardProps {
  content: string;
  tone: string;
  type: string;
  length: string;
}

export default function PostCard({ content, tone, type, length }: PostCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-white hover:shadow-md transition">
      <div className="flex gap-2 mb-4 flex-wrap">
        <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
          {tone}
        </span>
        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
          {type}
        </span>
        <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
          {length}
        </span>
      </div>
      <p className="text-gray-800 mb-4 leading-relaxed whitespace-pre-wrap text-base">{content}</p>
      <button
        onClick={handleCopy}
        className={`w-full py-2 px-4 rounded font-medium transition ${
          copied
            ? 'bg-green-100 text-green-800'
            : 'bg-linkedin text-white hover:bg-blue-700'
        }`}
      >
        {copied ? '✓ Copied to clipboard' : '📋 Copy to clipboard'}
      </button>
    </div>
  );
}