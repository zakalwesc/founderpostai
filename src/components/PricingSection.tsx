import Link from 'next/link';

export default function PricingSection() {
  return (
    <div className="py-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Simple, Transparent Pricing
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
          <p className="text-gray-600 mb-6">Perfect to get started</p>

          <div className="mb-8">
            <div className="text-5xl font-bold text-gray-900">$0</div>
            <p className="text-gray-600 text-sm mt-2">Forever free</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">2 posts/month</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">5 variations each</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">All tones & types</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">Post history</span>
            </li>
          </ul>

          <Link
            href="/auth/signup"
            className="w-full block text-center px-6 py-3 border border-linkedin text-linkedin rounded-lg hover:bg-blue-50 font-semibold transition"
          >
            Get Started
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="bg-gradient-to-br from-linkedin to-blue-700 rounded-lg shadow-lg p-8 border border-blue-600 relative">
          <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
            MOST POPULAR
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
          <p className="text-blue-100 mb-6">For serious content creators</p>

          <div className="mb-8">
            <div className="text-5xl font-bold text-white">$9</div>
            <p className="text-blue-100 text-sm mt-2">per month, billed monthly</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white">50 posts/month</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white">All tones & types</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white">Full post history</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white">Priority support</span>
            </li>
          </ul>

          <Link
            href="/auth/signup"
            className="w-full block text-center px-6 py-3 bg-white text-linkedin rounded-lg hover:bg-gray-100 font-bold transition"
          >
            Start Free Trial
          </Link>

          <p className="text-center text-blue-100 text-xs mt-4">No credit card required to try</p>
        </div>
      </div>
    </div>
  );
}