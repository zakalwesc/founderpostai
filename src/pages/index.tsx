import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>FounderPostAI — LinkedIn Posts That Get Engagement</title>
      </Head>
      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="border-b border-gray-100 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">f</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">FounderPostAI</span>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <Link href="/dashboard" className="bg-[#0A66C2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                    Log in
                  </Link>
                  <Link href="/signup" className="bg-[#0A66C2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Get started free
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0A66C2] px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span>✨</span>
              <span>Built specifically for LinkedIn founders</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Stop staring at a blank page.
              <span className="text-[#0A66C2]"> Generate LinkedIn posts</span> that actually get engagement.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              5 optimized post variations in seconds. No prompt engineering. No generic ChatGPT output. Just scroll-stopping LinkedIn content that sounds like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-[#0A66C2] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Start for free — 2 posts/month
              </Link>
              <Link href="/signup" className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors">
                See how it works →
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">No credit card required • Free plan available</p>
          </div>
        </section>

        {/* Why not ChatGPT */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Why not just use ChatGPT?
            </h2>
            <p className="text-gray-600 text-center mb-16 text-lg">Great question. Here&apos;s the difference.</p>
            <div className="grid md:grid-cols-2 gap-8">
              {/* ChatGPT */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">🤖</div>
                  <h3 className="text-xl font-bold text-gray-500">Generic ChatGPT</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Requires you to write the perfect prompt',
                    'Outputs blog-style text, not LinkedIn format',
                    'No understanding of LinkedIn algorithm',
                    'One output at a time, no variations',
                    'Starts with "I" — LinkedIn posts hate that',
                    'No tone/length/type controls',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-500">
                      <span className="text-red-400 mt-0.5">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* FounderPostAI */}
              <div className="bg-white rounded-2xl p-8 border-2 border-[#0A66C2] relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0A66C2] text-white text-xs font-bold px-4 py-1 rounded-full">
                  BUILT FOR LINKEDIN
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">⚡</div>
                  <h3 className="text-xl font-bold text-[#0A66C2]">FounderPostAI</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Just enter your topic — we handle the prompting',
                    'LinkedIn-optimized format with short paragraphs',
                    'Algorithm-aware hooks that stop the scroll',
                    '5 variations with different angles every time',
                    'Never starts with "I" — follows LinkedIn best practices',
                    'Tone, post type & length controls built right in',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">How it works</h2>
            <p className="text-gray-600 text-center mb-16 text-lg">From idea to 5 post variations in under 10 seconds</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Enter your topic',
                  desc: 'Type what you want to post about. Could be a lesson, a win, a hot take — anything.',
                  icon: '✏️',
                },
                {
                  step: '2',
                  title: 'Set your style',
                  desc: 'Choose tone (casual/professional), post type (story/tips/question), and length. Done.',
                  icon: '🎛️',
                },
                {
                  step: '3',
                  title: 'Pick your favorite',
                  desc: 'Get 5 variations instantly. Copy the one that resonates, post it, watch engagement roll in.',
                  icon: '🚀',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-[#0A66C2] mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 py-20 bg-gray-50" id="pricing">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">Simple pricing</h2>
            <p className="text-gray-600 text-center mb-16 text-lg">Start free. Upgrade when you&apos;re ready.</p>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Free */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {[
                    '2 posts per month',
                    '5 variations per generation',
                    'All tones & post types',
                    'Copy to clipboard',
                    'Post history',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-600">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block w-full text-center border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Get started
                </Link>
              </div>
              {/* Pro */}
              <div className="bg-[#0A66C2] rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-6">$9<span className="text-lg font-normal opacity-75">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {[
                    '50 posts per month',
                    '5 variations per generation',
                    'All tones & post types',
                    'Copy to clipboard',
                    'Full post history',
                    'Priority generation',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-blue-100">
                      <span className="text-white">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block w-full text-center bg-white text-[#0A66C2] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  Start for $9/mo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#0A66C2] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">f</span>
              </div>
              <span className="font-bold text-gray-900">FounderPostAI</span>
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} FounderPostAI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700">Log in</Link>
              <Link href="/signup" className="text-sm text-gray-500 hover:text-gray-700">Sign up</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
