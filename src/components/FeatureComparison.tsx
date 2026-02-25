export default function FeatureComparison() {
  const features = [
    { name: 'LinkedIn-Optimized', founderPostAI: true, chatGPT: false },
    { name: 'One-Click Generation', founderPostAI: true, chatGPT: false },
    { name: '5 Variations', founderPostAI: true, chatGPT: false },
    { name: 'Tone Selection', founderPostAI: true, chatGPT: false },
    { name: 'Post Type Options', founderPostAI: true, chatGPT: false },
    { name: 'Length Control', founderPostAI: true, chatGPT: false },
    { name: 'Copy-to-Clipboard', founderPostAI: true, chatGPT: false },
    { name: 'Post History', founderPostAI: true, chatGPT: false },
    { name: 'Usage Tracking', founderPostAI: true, chatGPT: false },
    { name: 'Free Tier', founderPostAI: true, chatGPT: false },
  ];

  return (
    <div className="py-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Feature Comparison
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 text-gray-900 font-semibold">Feature</th>
              <th className="text-center py-4 px-6 text-linkedin font-semibold">FounderPostAI</th>
              <th className="text-center py-4 px-6 text-gray-500 font-semibold">ChatGPT</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <td className="py-4 px-6 text-gray-900 font-medium">{feature.name}</td>
                <td className="text-center py-4 px-6">
                  {feature.founderPostAI ? (
                    <svg className="w-6 h-6 text-success mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="text-center py-4 px-6">
                  {feature.chatGPT ? (
                    <svg className="w-6 h-6 text-success mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
