import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>FounderPostAI - Generate Engaging LinkedIn Posts</title>
        <meta
          name="description"
          content="Stop staring at a blank page. Generate LinkedIn posts that actually get engagement."
        />
      </Head>

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Stop staring at a blank page.
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Generate LinkedIn posts that actually get engagement.
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Get 5 optimized post variations in seconds. Specifically designed for LinkedIn,
              not generic ChatGPT.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-4 rounded-lg bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 transition"
            >
              Get Started Free (2 posts/month)
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Why FounderPostAI</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">LinkedIn Optimized</h3>
                <p className="text-gray-600">
                  Not generic ChatGPT. Built specifically for LinkedIn engagement.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">One-Click Generation</h3>
                <p className="text-gray-600">
                  No prompt engineering. Just select tone, type, and length.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold mb-2">5 Variations in Seconds</h3>
                <p className="text-gray-600">
                  Get multiple options instantly. Choose the one that resonates.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-bold mb-2">Customizable Options</h3>
                <p className="text-gray-600">
                  Professional, casual, funny, thought-leadership tones built-in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Not ChatGPT?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4 text-red-600">Generic ChatGPT</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>❌ Generic suggestions, not optimized for LinkedIn</li>
                  <li>❌ Requires extensive prompt engineering</li>
                  <li>❌ Inconsistent tone and style</li>
                  <li>❌ No understanding of LinkedIn best practices</li>
                  <li>❌ Time-consuming iteration needed</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-600">FounderPostAI</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>✓ LinkedIn-specific optimization</li>
                  <li>✓ One-click generation, no prompting</li>
                  <li>✓ Consistent, professional results</li>
                  <li>✓ Built by LinkedIn engagement experts</li>
                  <li>✓ Instant, ready-to-post content</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-gray-300 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <p className="text-4xl font-bold mb-2">$0</p>
                <p className="text-gray-600 mb-6">/month</p>
                <ul className="space-y-3 mb-8 text-gray-700">
                  <li>✓ 2 posts per month</li>
                  <li>✓ All tones & types</li>
                  <li>✓ Full feature access</li>
                </ul>
                <Link
                  href="/auth/signup"
                  className="block text-center py-3 px-4 rounded border border-gray-300 hover:bg-gray-50"
                >
                  Get Started
                </Link>
              </div>

              <div className="border-2 border-blue-600 rounded-lg p-8 bg-blue-50">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <p className="text-4xl font-bold mb-2">$9</p>
                <p className="text-gray-600 mb-6">/month</p>
                <ul className="space-y-3 mb-8 text-gray-700">
                  <li>✓ 50 posts per month</li>
                  <li>✓ All tones & types</li>
                  <li>✓ Priority support</li>
                  <li>✓ Post history</li>
                </ul>
                <Link
                  href="/auth/signup"
                  className="block text-center py-3 px-4 rounded bg-blue-600 text-white hover:bg-blue-700 font-bold"
                >
                  Try Pro Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Stop Struggling?</h2>
            <p className="text-lg mb-8">
              Join founders getting engagement with better LinkedIn posts.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-4 rounded-lg bg-white text-blue-600 font-bold hover:bg-gray-100"
            >
              Start Generating Posts Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 FounderPostAI. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}