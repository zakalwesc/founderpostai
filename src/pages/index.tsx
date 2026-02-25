import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/auth/signup');
    }
  };

  if (loading) return null;

  return (
    <>
      <Head>
        <title>FounderPostAI - Generate LinkedIn Posts That Get Engagement</title>
        <meta
          name="description"
          content="Stop staring at a blank page. Generate LinkedIn posts that actually get engagement. Optimized for LinkedIn, not generic ChatGPT."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="FounderPostAI - LinkedIn Post Generator" />
        <meta
          property="og:description"
          content="Generate 5 LinkedIn post variations in seconds. Optimized for founders and professionals."
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navBrand}>FounderPostAI</div>
          <div className={styles.navLinks}>
            {isAuthenticated ? (
              <>
                <button
                  className={styles.navLink}
                  onClick={() => router.push('/dashboard')}
                >
                  Dashboard
                </button>
                <button className={styles.navLink} onClick={() => router.push('/auth/logout')}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.navLink}
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </button>
                <button
                  className={`${styles.navLink} ${styles.navCta}`}
                  onClick={() => router.push('/auth/signup')}
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </nav>

        <main className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Stop staring at a blank page.</h1>
            <p className={styles.subtitle}>
              Generate LinkedIn posts that actually get engagement.
            </p>
            <div className={styles.tagline}>
              <p>
                <strong>Optimized for LinkedIn</strong> — Not generic ChatGPT. Specific tones,
                post types, and lengths built in.
              </p>
              <p>
                <strong>Frictionless generation</strong> — One click, five variations in seconds.
              </p>
              <p>
                <strong>Results-focused</strong> — Crafted for engagement, not filler content.
              </p>
            </div>

            <button className={styles.ctaButton} onClick={handleGetStarted}>
              {isAuthenticated ? 'Go to Generator' : 'Start for Free'}
            </button>

            <div className={styles.pricing}>
              <div className={styles.pricingCard}>
                <h3>Free</h3>
                <p className={styles.price}>$0</p>
                <p className={styles.limit}>2 posts/month</p>
                <p className={styles.description}>Perfect for getting started</p>
              </div>
              <div className={`${styles.pricingCard} ${styles.pricingCardPro}`}>
                <h3>Pro</h3>
                <p className={styles.price}>$9</p>
                <p className={styles.limit}>/month</p>
                <p className={styles.description}>50 posts/month for serious creators</p>
              </div>
            </div>
          </div>
        </main>

        <section className={styles.features}>
          <h2>Why FounderPostAI Beats ChatGPT</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h4>LinkedIn-Specific</h4>
              <p>
                Not a generic AI. We understand LinkedIn's algorithm, tone, and what drives
                engagement on the platform.
              </p>
            </div>
            <div className={styles.feature}>
              <h4>No Prompt Engineering</h4>
              <p>
                One-click generation. No need to craft perfect prompts or iterate endlessly. Just
                topic, tone, type, and length.
              </p>
            </div>
            <div className={styles.feature}>
              <h4>5 Variations in Seconds</h4>
              <p>
                Get five distinct post options instantly. Compare approaches and pick what resonates
                with your audience.
              </p>
            </div>
            <div className={styles.feature}>
              <h4>Built-In Optimization</h4>
              <p>
                Tone (professional, casual, funny, thought-leadership) and length (short, medium,
                long) options pre-configured.
              </p>
            </div>
            <div className={styles.feature}>
              <h4>Post History & Usage</h4>
              <p>
                Track all generated posts and monthly usage. Know exactly how many posts you have left
                in your tier.
              </p>
            </div>
            <div className={styles.feature}>
              <h4>One-Click Copy</h4>
              <p>Copy any variation to clipboard instantly. Go from generation to posting in seconds.</p>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>&copy; 2024 FounderPostAI. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
