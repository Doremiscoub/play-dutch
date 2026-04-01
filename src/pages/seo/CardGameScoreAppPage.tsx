import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { SoftwareAppSchema, FAQSchema } from '@/components/seo/SchemaMarkup';

const faqItems = [
  { question: 'What is the best card game score app?', answer: 'Dutch Card Game Companion is a top-rated free score tracking app. It offers automatic calculations, AI commentary, player statistics, game history, and offline support — all without requiring an account.' },
  { question: 'Is there a free app to keep score for card games?', answer: 'Yes. Dutch Card Game Companion is completely free with no hidden costs, no ads wall, and no account required. It works on any device with a web browser and can be installed as a native-like app.' },
  { question: 'Can I track scores for multiple games?', answer: 'Yes. Each game is saved independently in your history. You can start a new game anytime and review past games with full round-by-round statistics.' },
  { question: 'Does it work on iPhone and Android?', answer: 'Yes. Dutch Card Game Companion is a Progressive Web App (PWA) that works on any modern browser. Install it on your home screen for a native app experience on both iPhone and Android.' },
];

export default function CardGameScoreAppPage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'Best Card Game Score App — Free, Offline, AI-Powered | Dutch Companion',
        description:
          'The best free card game score tracking app. AI commentary, automatic calculations, player stats, game history. Works offline on any device. No account needed.',
        keywords:
          'card game score app, best score keeping app, card game tracker, free score app, game score counter app, score tracker card games, dutch card game app',
      }}
      breadcrumbs={[
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
          { emoji: '⚡', title: 'Instant Setup', desc: 'Add player names, set a score limit, and start tracking in under 10 seconds.' },
          { emoji: '🤖', title: 'AI Game Commentary', desc: 'Professor Cartouche reacts to scores with humor, strategy tips, and personality.' },
          { emoji: '📊', title: 'Real-time Statistics', desc: 'Averages, trends, streaks, best scores — calculated live after every round.' },
          { emoji: '📱', title: 'Install Like an App', desc: 'Add to your home screen on iPhone or Android. Looks and feels like a native app.' },
          { emoji: '✈️', title: 'Works Offline', desc: 'No internet needed after first visit. Play anywhere — camping, trains, flights.' },
          { emoji: '🔒', title: 'Private by Design', desc: 'All data stored on your device. No account, no tracking, no data collection.' },
        ].map((f) => (
          <div key={f.title} className="p-5 rounded-xl glass-surface">
            <div className="text-2xl mb-2">{f.emoji}</div>
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
        Learn the <Link to="/dutch-rules" className="text-primary hover:underline">rules of Dutch</Link> or
        read our <Link to="/how-to-keep-score-card-games" className="text-primary hover:underline">guide to keeping score in card games</Link>.
      </p>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="not-prose space-y-4 mb-8">
        {faqItems.map((item) => (
          <details key={item.question} className="group rounded-xl glass-surface">
            <summary className="px-5 py-4 font-medium cursor-pointer list-none flex items-center justify-between">
              {item.question}
              <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="px-5 pb-4 text-muted-foreground">{item.answer}</div>
          </details>
        ))}
      </div>
    </SEOPageLayout>
  );
}
