import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { SoftwareAppSchema, FAQSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';

const faqItems = [
  { question: 'What is the best score tracker for card games?', answer: 'Dutch Card Game Companion is a top-rated free score tracker. It offers automatic score calculations, AI commentary, per-player statistics, game history, and offline support. It works for Dutch, Cabo, Rummy, Hearts, and any round-based card game.' },
  { question: 'Are there free score tracker apps?', answer: 'Yes. Dutch Card Game Companion is completely free — no premium tier, no ads wall, no account required. It runs in your browser and can be installed as a native-like app on any device.' },
  { question: 'What features should a good score tracker have?', answer: 'A good card game score tracker should offer: automatic calculations, cumulative totals, player rankings, statistics (averages, trends), game history, offline support, and an easy-to-use interface. Dutch Card Game Companion includes all of these plus AI commentary.' },
  { question: 'Can I use a score tracker for tournaments?', answer: 'Yes. Dutch Card Game Companion supports any number of separate games. Track tournament rounds individually, then compare results from game history. Adjustable score limits (50, 75, 100, 150, 200) support various tournament formats.' },
];

export default function BestScoreTrackerPage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'Best Score Tracker for Card Games (2026) — Free App Comparison',
        description:
          'Comparing the best card game score trackers. Features, pricing, and why Dutch Card Game Companion is the top free choice for Dutch, Rummy, Hearts, and more.',
        keywords:
          'best score tracker card games, card game score app comparison, best card game app, score tracker review, card game companion app, free score tracker 2026',
      }}
      breadcrumbs={[
        { label: 'Score Tracker', href: '/score-tracker' },
        { label: 'Best Score Trackers', href: '/best-score-tracker-card-games' },
      ]}
      ctaText="Try Dutch Companion Free"
      ctaHref="/setup"
    >
      <SoftwareAppSchema />
      <FAQSchema items={faqItems} />
      <ArticleSchema
        title="Best Score Tracker for Card Games"
        description="Comparison of the best card game score tracking apps."
        path="/best-score-tracker-card-games"
      />

      <h1 className="text-4xl font-bold mb-6">Best Score Tracker for Card Games</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Looking for a score tracker that actually works? Here's what to look for, and why{' '}
        <strong>Dutch Card Game Companion</strong> is the top free option.
      </p>

      {/* What to Look For */}
      <h2 className="text-2xl font-bold mb-4">What Makes a Great Score Tracker?</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">Why It Matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3 font-medium">Auto-calculations</td><td className="px-4 py-3 text-muted-foreground">No mental math — totals, rankings, and averages update instantly</td></tr>
              <tr><td className="px-4 py-3 font-medium">Offline support</td><td className="px-4 py-3 text-muted-foreground">Card games happen everywhere — the app must work without WiFi</td></tr>
              <tr><td className="px-4 py-3 font-medium">Game history</td><td className="px-4 py-3 text-muted-foreground">Review past games and track improvement over time</td></tr>
              <tr><td className="px-4 py-3 font-medium">Player statistics</td><td className="px-4 py-3 text-muted-foreground">Averages, trends, and streaks add depth and bragging rights</td></tr>
              <tr><td className="px-4 py-3 font-medium">Easy input</td><td className="px-4 py-3 text-muted-foreground">Score entry should take seconds, not interrupt the game</td></tr>
              <tr><td className="px-4 py-3 font-medium">Free access</td><td className="px-4 py-3 text-muted-foreground">No one wants to pay for a score tracker at a casual game night</td></tr>
              <tr><td className="px-4 py-3 font-medium">Privacy</td><td className="px-4 py-3 text-muted-foreground">Game data should stay on your device — no account required</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dutch Companion Features */}
      <h2 className="text-2xl font-bold mb-4">Dutch Card Game Companion — Feature Breakdown</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { title: 'Instant Score Entry', desc: 'Tap "New Round," enter scores for each player, submit. Under 10 seconds.' },
          { title: 'Auto Rankings', desc: 'Live leaderboard updated after every round with cumulative totals.' },
          { title: 'AI Commentary', desc: 'Professor Cartouche — a built-in AI — comments on plays, streaks, and comebacks.' },
          { title: 'Rich Statistics', desc: 'Per-player averages, best/worst rounds, trends, and Dutch call success rates.' },
          { title: 'Full Game History', desc: 'Every completed game is saved. Drill down into round-by-round details.' },
          { title: 'Score Charts', desc: 'Visual graphs showing score progression across rounds for all players.' },
          { title: 'Offline PWA', desc: 'Install on your phone. Works without internet. Data stored locally.' },
          { title: 'Free Forever', desc: 'No premium tier, no ads wall, no account. 100% free to use.' },
        ].map((f) => (
          <div key={f.title} className="p-5 rounded-xl glass-surface">
            <h3 className="font-bold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Use Cases */}
      <h2 className="text-2xl font-bold mb-4">Who Is It For?</h2>
      <ul className="space-y-2 mb-8">
        <li><strong>Dutch / Cabo / Golf players</strong> — built specifically for this game family with Dutch-call tracking.</li>
        <li><strong>Family game nights</strong> — simple enough for kids, detailed enough for competitive adults.</li>
        <li><strong>Card game groups</strong> — works for Rummy, Hearts, Spades, or any round-based game.</li>
        <li><strong>Tournament organizers</strong> — adjustable score limits, individual game tracking, and history.</li>
      </ul>

      {/* How to Get Started */}
      <h2 className="text-2xl font-bold mb-4">Get Started in 30 Seconds</h2>
      <ol className="space-y-2 mb-8">
        <li><strong>Open the app</strong> — no download or sign-up required.</li>
        <li><strong>Add players</strong> — type names and set a score limit.</li>
        <li><strong>Play and track</strong> — enter round scores as you go.</li>
      </ol>

      <p>
        Learn the <Link to="/dutch-rules" className="text-primary hover:underline">rules of Dutch</Link> or
        read our guide on{' '}
        <Link to="/how-to-keep-score-card-games" className="text-primary hover:underline">how to keep score in card games</Link>.
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
