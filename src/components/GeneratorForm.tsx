import { useState } from 'react';

interface GeneratorFormProps {
  onGenerate: (topic: string, tone: string, postType: string, length: string) => void;
  isGenerating: boolean;
  isAtLimit: boolean;
  onUpgrade: () => void;
}

export default function GeneratorForm({ onGenerate, isGenerating, isAtLimit, onUpgrade }: GeneratorFormProps) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [postType, setPostType] = useState('story');
  const [length, setLength] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isAtLimit || isGenerating) return;
    onGenerate(topic.trim(), tone, postType, length);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Generate Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic / Idea <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent resize-none"
            placeholder="e.g. We just hit $10k MRR after 6 months of grinding. Here's what actually worked..."
          />
          <p className="text-xs text-gray-400 mt-1">{topic.length} chars</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] bg-white"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="funny">Funny</option>
            <option value="thought-leadership">Thought Leadership</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A66C2] bg-white"
          >
            <option value="story">Story</option>
            <option value="tips">Tips / Advice</option>
            <option value="questions">Question / Poll</option>
            <option value="announcement">Announcement</option>
            <option value="insight">Insight / Stat</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'short', label: 'Short', sub: '~280' },
              { value: 'medium', label: 'Medium', sub: '~500' },
              { value: 'long', label: 'Long', sub: '1000+' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setLength(opt.value)}
                className={`p-3 rounded-xl border text-center transition-colors ${
                  length === opt.value
                    ? 'border-[#0A66C2] bg-blue-50 text-[#0A66C2]'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-xs opacity-70">{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {isAtLimit ? (
          <button
            type="button"
            onClick={onUpgrade}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Upgrade to generate more →
          </button>
        ) : (
          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full bg-[#0A66C2] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : '⚡ Generate 5 variations'}
          </button>
        )}
      </form>
    </div>
  );
}
