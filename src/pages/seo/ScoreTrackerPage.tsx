import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { SoftwareAppSchema, FAQSchema } from '@/components/seo/SchemaMarkup';
import { FAQSection } from '@/components/seo/FAQSection';

const faqItems = [
  { question: 'Is the Dutch score tracker free?', answer: 'Yes, Dutch Card Game Companion is 100% free. No ads wall, no premium tier, no account required.' },
  { question: 'Does the score tracker work offline?', answer: 'Yes. As a Progressive Web App (PWA), it works fully offline after your first visit. All data is stored locally on your device via browser storage.' },
  { question: 'How do I install the score tracker on my phone?', answer: 'On Android (Chrome): tap the menu (three dots) then "Install app." On iPhone (Safari): tap the share button then "Add to Home Screen." The app will appear like a native app on your home screen.' },
  { question: 'Is my data private?', answer: 'Yes. All game data is stored locally on your device using browser storage. No data is sent to any server. No account or personal information is required.' },
];

export default function ScoreTrackerPage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'Free Card Game Score Tracker — Dutch Card Game Companion',
        description:
          'Free score tracking app for Dutch and other card games. Track scores, view statistics, get AI commentary. Works offline, no account needed.',
        keywords:
          'card game score tracker, score tracker app, dutch score tracker, free score tracker, card game app, score keeping app, game score counter',
      }}
      breadcrumbs={[
        { label: 'Score Tracker', href: '/score-tracker' },
      ]}
      ctaText="Open Score Tracker"
      ctaHref="/setup"
    >
      <SoftwareAppSchema />
      <FAQSchema items={faqItems} />

      <h1 className="text-4xl font-bold mb-6">
        Free Card Game Score Tracker
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        Stop using pen and paper. <strong>Dutch Card Game Companion</strong> tracks scores
        automatically, shows statistics in real time, and works offline on any device.
      </p>

      {/* Key Features */}
      <h2 className="text-2xl font-bold mb-4">What You Get</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { title: 'Instant Score Entry', desc: 'Add scores for each round in seconds. Auto-calculates totals and rankings.' },
          { title: 'Live Statistics', desc: 'Per-player averages, best scores, trends, and streak tracking — updated after every round.' },
          { title: 'AI Commentary', desc: 'Professor Cartouche — a built-in AI — reacts to plays with humor and insight.' },
          { title: 'Game History', desc: 'Every finished game is saved locally. Review past games round by round with full stats.' },
          { title: 'Works Offline', desc: 'Install as a PWA. Play in the park, on a train, or anywhere without internet.' },
          { title: '100% Free & Private', desc: 'No account, no ads wall, no data collection. Your games stay on your device.' },
        ].map((f) => (
          <div key={f.title} className="p-5 rounded-xl glass-surface">
            <h3 className="font-bold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <h2 className="text-2xl font-bold mb-4">How It Works</h2>
      <ol className="space-y-3 mb-8">
        <li><strong>Create a game</strong> — enter player names and set the score limit.</li>
        <li><strong>Play your card game</strong> — Dutch, or any round-based card game.</li>
        <li><strong>Enter scores</strong> after each round. Tap "New Round," type each player's score, submit.</li>
        <li><strong>View rankings</strong> — the leaderboard, charts, and stats update instantly.</li>
        <li><strong>Game over</strong> — when someone hits the limit, see the final standings and save to history.</li>
      </ol>

      {/* Comparison */}
      <h2 className="text-2xl font-bold mb-4">Why Not Pen & Paper?</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">Pen & Paper</th>
                <th className="px-4 py-3 font-semibold">Dutch Companion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3">Auto-calculate totals</td><td className="px-4 py-3">No</td><td className="px-4 py-3 text-green-500 font-medium">Yes</td></tr>
              <tr><td className="px-4 py-3">Live rankings</td><td className="px-4 py-3">Manual</td><td className="px-4 py-3 text-green-500 font-medium">Automatic</td></tr>
              <tr><td className="px-4 py-3">Statistics & trends</td><td className="px-4 py-3">No</td><td className="px-4 py-3 text-green-500 font-medium">Yes</td></tr>
              <tr><td className="px-4 py-3">Game history</td><td className="px-4 py-3">Lost easily</td><td className="px-4 py-3 text-green-500 font-medium">Saved forever</td></tr>
              <tr><td className="px-4 py-3">AI commentary</td><td className="px-4 py-3">No</td><td className="px-4 py-3 text-green-500 font-medium">Yes</td></tr>
              <tr><td className="px-4 py-3">Works offline</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3 text-green-500 font-medium">Yes</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="mb-4">
        See how Dutch Companion stacks up against other options in our{' '}
        <Link to="/best-score-tracker-card-games" className="text-primary hover:underline">best score trackers comparison</Link>.
        Or read about the{' '}
        <Link to="/card-game-score-app" className="text-primary hover:underline">full app features</Link>.
      </p>

      {/* Supported Games */}
      <h2 className="text-2xl font-bold mb-4">Supported Games</h2>
      <p className="mb-4">
        Built for <Link to="/dutch-card-game" className="text-primary hover:underline">Dutch</Link>,
        but works for any card game with round-based scoring:
      </p>
      <ul className="space-y-1 mb-8">
        <li>Dutch (Cabo / Golf / Cambio)</li>
        <li>Rummy</li>
        <li>Hearts</li>
        <li>Spades</li>
        <li>Any custom card game with point tracking</li>
      </ul>

      <FAQSection items={faqItems} />
    </SEOPageLayout>
  );
}
