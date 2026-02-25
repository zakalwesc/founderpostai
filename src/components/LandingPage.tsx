import { useState } from 'react';
import Link from 'next/link';
import FeatureComparison from './FeatureComparison';
import PricingSection from './PricingSection';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-linkedin">FounderPostAI</div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-2 bg-linkedin text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Stop staring at a blank page.
        </h1>
        <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Generate LinkedIn posts that actually get engagement.
        </p>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Not generic ChatGPT. Optimized for LinkedIn. One click. Five variations. Seconds.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Link
            href="/auth/signup"
            className="px-8 py-4 bg-linkedin text-white rounded-lg hover:bg-blue-700 font-bold text-lg"
          >
            Start Generating (Free)
          </Link>
          <a
            href="#features"
            className="px-8 py-4 border-2 border-linkedin text-linkedin rounded-lg hover:bg-linkedin hover:text-white font-bold text-lg transition"
          >
            Learn More
          </a>
        </div>

        {/* Social Proof */}
        <div className="inline-block bg-white rounded-lg shadow-lg p-6 mb-16">
          <p className="text-sm text-gray-600 mb-4">Join founders and creators generating posts</p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-linkedin to-blue-600 border-2 border-white flex items-center justify-center text-white font-bold"
                >
                  {i}
                </div>
              ))}
            </div>
            <span className="text-gray-700 font-medium ml-2">500+ active users</span>
          </div>
        </div>
      </section>

      {/* Why FounderPostAI Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-xl shadow-sm"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Why FounderPostAI Beats ChatGPT
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-linkedin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Optimized for LinkedIn</h3>
                <p className="text-gray-600">
                  Built specifically for LinkedIn's algorithm. Not generic ChatGPT output. Real engagement boost.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-linkedin" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">One-Click Generation</h3>
                <p className="text-gray-600">
                  No prompt engineering. No tweaking. Just describe your idea and get 5 polished posts instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-linkedin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">5 Variations in Seconds</h3>
                <p className="text-gray-600">
                  Get 5 unique angles on your idea. Pick your favorite. Copy. Post. Done.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-linkedin" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tone Control</h3>
                <p className="text-gray-600">
                  Professional, casual, funny, or thought-leadership. Your brand voice. Not ours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-linkedin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Length Customization</h3>
                <p className="text-gray-600">
                  Short (280 chars), medium (500), or long (1000+). The right length for your message.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-linkedin/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-linkedin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Copy & Share</h3>
                <p className="text-gray-600">
                  One-click copy. Paste directly to LinkedIn. No formatting issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FeatureComparison />
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PricingSection />
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to write better LinkedIn posts?</h2>
        <p className="text-xl text-gray-600 mb-8">Get your free 2 posts today. No credit card required.</p>
        <Link
          href="/auth/signup"
          className="px-8 py-4 bg-linkedin text-white rounded-lg hover:bg-blue-700 font-bold text-lg inline-block"
        >
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>&copy; 2024 FounderPostAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
