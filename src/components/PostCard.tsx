import { useState } from 'react';

interface PostCardProps {
  content: string;
  label: string;
  meta?: string;
  onCopy: () => void;
}

export default function PostCard({ content, label, meta, onCopy }: PostCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-sm font-semibold text-gray-700">{label}</span>
          {meta && <span className="text-xs text-gray-400 ml-2">{meta}</span>}
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>⎘</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</div>
      <div className="mt-3 text-xs text-gray-400">{content.length} characters</div>
    </div>
  );
}
