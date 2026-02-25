import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/Upgrade.module.css';

export default function Upgrade() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
    
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleUpgrade = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upgrade failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Upgrade to Pro - FounderPostAI</title>
      </Head>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navBrand}>FounderPostAI</div>
          <button onClick={() => router.push('/dashboard')} className={styles.backBtn}>
            ← Back to Dashboard
          </button>
        </nav>

        <main className={styles.main}>
          <h1>Upgrade to Pro</h1>
          <p className={styles.subtitle}>
            Unlock unlimited post generation and advanced features.
          </p>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.upgradePlan}>
            <h2>Pro Plan</h2>
            <p className={styles.price}>$9<span>/month</span></p>
            <p className={styles.posts}>50 posts per month</p>

            <ul className={styles.benefits}>
              <li>✓ 50 LinkedIn posts per month</li>
              <li>✓ Professional, casual, funny, and thought-leadership tones</li>
              <li>✓ Story, tips, and questions post types</li>
              <li>✓ Multiple length options</li>
              <li>✓ Full post history and analytics</li>
              <li>✓ One-click copy to clipboard</li>
            </ul>

            <button
              className={styles.upgradeBtn}
              onClick={handleUpgrade}
              disabled={loading}
            >
              {loading ? 'Redirecting to Stripe...' : 'Upgrade Now'}
            </button>
          </div>

          <div className={styles.faq}>
            <h3>Why upgrade?</h3>
            <p>
              Free users get 2 posts/month to try FounderPostAI. Pro users get 50 posts/month,
              perfect for creators, founders, and professionals who want to maintain a consistent,
              engaging LinkedIn presence without the pain of writing from scratch.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
