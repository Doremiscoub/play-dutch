import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { SoftwareAppSchema, FAQSchema } from '@/components/seo/SchemaMarkup';
import { FAQSection } from '@/components/seo/FAQSection';

const faqItems = [
  { question: 'What makes Dutch Companion the best card game score app?', answer: 'Dutch Card Game Companion combines instant score entry, AI commentary from Professor Cartouche, per-player statistics, game history, and offline PWA support — all for free, with no account required. No other free app offers this combination.' },
  { question: 'Do I need to download anything?', answer: 'No download required. Open it in your browser and start using it immediately. Optionally, install it as a PWA (Add to Home Screen) for a native-like experience.' },
  { question: 'Can I track scores for multiple games at once?', answer: 'Each game is saved independently in your history. Finish one game, start another. You can review any past game with full round-by-round data and stats.' },
  { question: 'Does the app work on iPhone and Android?', answer: 'Yes. Dutch Card Game Companion is a Progressive Web App that works on any modern browser — Chrome, Safari, Firefox, Edge — on any device. Install it on your home screen for the best experience.' },
];

export default function CardGameScoreAppPage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'Best Card Game Score App — Free, Offline, AI-Powered',
        description:
          'The best free card game score tracking app. AI commentary, automatic calculations, player stats, game history. Works offline on any device. No account needed.',
        keywords:
          'card game score app, best score keeping app, card game tracker, free score app, game score counter app, score tracker card games, dutch card game app',
      }}
      breadcrumbs={[
        { label: 'Score Tracker', href: '/score-tracker' },
        { label: 'Card Game Score App', href: '/card-game-score-app' },
      ]}
      ctaText="Try the App Free"
      ctaHref="/setup"
    >
      <SoftwareAppSchema />
      <FAQSchema items={faqItems} />

      <h1 className="text-4xl font-bold mb-6">
        The Best Free Card Game Score App
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        <strong>Dutch Card Game Companion</strong> replaces pen and paper with instant score
        tracking, live statistics, AI commentary, and game history — all in a free app that works
        offline.
      </p>

      {/* Why This App */}
      <h2 className="text-2xl font-bold mb-4">Why Players Choose Dutch Companion</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { title: 'Instant Setup', desc: 'Add player names, set a score limit, and start tracking in under 10 seconds.' },
          { title: 'AI Game Commentary', desc: 'Professor Cartouche reacts to scores with humor, strategy tips, and personality.' },
          { title: 'Real-time Statistics', desc: 'Averages, trends, streaks, best scores — calculated live after every round.' },
          { title: 'Install Like an App', desc: 'Add to your home screen on iPhone or Android. Looks and feels like a native app.' },
          { title: 'Works Offline', desc: 'No internet needed after first visit. Play anywhere — camping, trains, flights.' },
          { title: 'Private by Design', desc: 'All data stored on your device. No account, no tracking, no data collection.' },
        ].map((f) => (
          <div key={f.title} className="p-5 rounded-xl glass-surface">
            <h3 className="font-bold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* How to Get Started */}
      <h2 className="text-2xl font-bold mb-4">Get Started in 3 Steps</h2>
      <ol className="space-y-3 mb-8">
        <li><strong>Open the app</strong> — no download or account needed. Just visit the website.</li>
        <li><strong>Create a game</strong> — add player names, pick your score limit (50, 75, 100, 150, 200).</li>
        <li><strong>Track scores</strong> — enter round results, and the app handles everything else.</li>
      </ol>

      {/* What You Can Track */}
      <h2 className="text-2xl font-bold mb-4">What You Can Track</h2>
      <ul className="space-y-2 mb-8">
        <li><strong>Round-by-round scores</strong> for 2–10 players</li>
        <li><strong>Cumulative totals</strong> with automatic ranking</li>
        <li><strong>Per-player stats:</strong> average, best score, worst score, trend</li>
        <li><strong>Dutch calls:</strong> who called it, whether it was successful</li>
        <li><strong>Game history:</strong> full archive of past games with drill-down</li>
        <li><strong>Score charts:</strong> visual progression of scores over rounds</li>
      </ul>

      {/* Ideal For */}
      <h2 className="text-2xl font-bold mb-4">Perfect For</h2>
      <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {['Dutch / Cabo', 'Family game nights', 'Tournaments', 'Any card game'].map((item) => (
          <div key={item} className="p-4 rounded-xl glass-surface text-center text-sm font-medium">
            {item}
          </div>
        ))}
      </div>

      <p>
        Learn the <Link to="/dutch-rules" className="text-primary hover:underline">rules of Dutch</Link>,
        read our <Link to="/how-to-keep-score-card-games" className="text-primary hover:underline">guide to keeping score in card games</Link>,
        or see how Dutch Companion compares in our{' '}
        <Link to="/best-score-tracker-card-games" className="text-primary hover:underline">best score trackers comparison</Link>.
      </p>

      <FAQSection items={faqItems} />
    </SEOPageLayout>
  );
}
