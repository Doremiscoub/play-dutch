import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { HowToSchema, FAQSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';

const howToSteps = [
  { name: 'Choose your tracking method', text: 'Use a digital score tracker (recommended), a notepad, or a whiteboard. Digital trackers auto-calculate totals and keep a permanent record.' },
  { name: 'Create a scoring grid', text: 'List all player names across the top. Each row represents one round. Leave a "Total" row at the bottom for cumulative scores.' },
  { name: 'Record scores after each round', text: 'At the end of each round, enter every player\'s score in the current row. Add the round score to their running total.' },
  { name: 'Track special events', text: 'Note who called Dutch (or made special plays). This context helps when reviewing games later and affects penalty calculations.' },
  { name: 'Monitor the leaderboard', text: 'After each round, check which player is closest to the score limit. This information drives strategy in upcoming rounds.' },
  { name: 'Save the final result', text: 'When the game ends, record the final standings. Digital trackers save this automatically to your game history.' },
];

const faqItems = [
  { question: 'How do you keep score in card games?', answer: 'The best way to keep score in card games is with a digital score tracker app. It auto-calculates totals, maintains rankings, and saves game history. Alternatively, use a notepad with player names across the top and one row per round. Add each round\'s score to the running total.' },
  { question: 'What is the best way to track card game scores?', answer: 'A dedicated score tracking app like Dutch Card Game Companion is the most efficient method. It eliminates math errors, provides instant rankings, and saves every game automatically. For analog tracking, a simple grid on paper works — but you lose the statistics and history.' },
  { question: 'Do I need an app to keep score?', answer: 'No, but an app makes it significantly easier. Manual tracking works with pen and paper, but you have to calculate totals yourself, rankings are manual, and you lose the record when the paper is gone. A digital tracker is faster, more accurate, and keeps a permanent history.' },
  { question: 'Can I track scores for any card game?', answer: 'Yes. Any card game that uses round-based scoring (Dutch, Rummy, Hearts, Spades, Bridge, etc.) can be tracked with a general score tracker. Dutch Card Game Companion is optimized for Dutch but works for any game with cumulative round scores.' },
];

export default function HowToKeepScorePage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'How to Keep Score in Card Games — Methods, Tips & Free App',
        description:
          'Learn the best ways to keep score in card games. Comparing pen & paper, spreadsheets, and digital score trackers. Free score tracking app included.',
        keywords:
          'how to keep score card games, card game score keeping, score tracking methods, best way to track card game scores, card game scoresheet, score keeping tips',
      }}
      breadcrumbs={[
        { label: 'Score Tracker', href: '/score-tracker' },
        { label: 'How to Keep Score', href: '/how-to-keep-score-card-games' },
      ]}
      ctaText="Try Free Score Tracker"
      ctaHref="/setup"
    >
      <HowToSchema
        name="How to Keep Score in Card Games"
        description="Guide to score tracking methods for card games — from pen and paper to digital apps."
        steps={howToSteps}
        totalTime="PT3M"
      />
      <FAQSchema items={faqItems} />
      <ArticleSchema
        title="How to Keep Score in Card Games"
        description="Complete guide to score tracking in card games."
        path="/how-to-keep-score-card-games"
      />

      <h1 className="text-4xl font-bold mb-6">How to Keep Score in Card Games</h1>

      {/* Direct Answer */}
      <div className="not-prose p-6 rounded-xl glass-elevated mb-8 border-l-4 border-primary">
        <p className="text-lg leading-relaxed">
          <strong>The best way to keep score in card games</strong> is with a digital score tracker
          that auto-calculates totals and rankings. For quick setups, a grid on paper (player
          names across the top, one row per round) works. For the best experience, use a{' '}
          <Link to="/score-tracker" className="text-primary hover:underline font-medium">free score tracking app</Link>.
        </p>
      </div>

      {/* Tracking Methods Comparison */}
      <h2 className="text-2xl font-bold mb-4">Score Tracking Methods Compared</h2>
      <div className="not-prose mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">Pros</th>
                <th className="px-4 py-3 font-semibold">Cons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Pen & Paper</td>
                <td className="px-4 py-3 text-muted-foreground">Always available, no setup</td>
                <td className="px-4 py-3 text-muted-foreground">Manual math, easy to lose, no stats</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Spreadsheet</td>
                <td className="px-4 py-3 text-muted-foreground">Auto-calculates, sharable</td>
                <td className="px-4 py-3 text-muted-foreground">Slow to set up, clunky on mobile</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Generic Score App</td>
                <td className="px-4 py-3 text-muted-foreground">Digital, auto-totals</td>
                <td className="px-4 py-3 text-muted-foreground">Not game-specific, often has ads</td>
              </tr>
              <tr className="bg-primary/5">
                <td className="px-4 py-3 font-bold">Dutch Companion</td>
                <td className="px-4 py-3 text-muted-foreground">Auto-everything, AI commentary, stats, history, offline, free</td>
                <td className="px-4 py-3 text-muted-foreground">Optimized for Dutch (but works for any game)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Step-by-Step */}
      <h2 className="text-2xl font-bold mb-4">How to Track Scores — Step by Step</h2>
      <div className="not-prose space-y-4 mb-10">
        {howToSteps.map((step, i) => (
          <div key={step.name} className="flex gap-4 p-5 rounded-xl glass-surface">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
              {i + 1}
            </div>
            <div>
              <h3 className="font-bold mb-1">{step.name}</h3>
              <p className="text-muted-foreground text-sm">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Paper Template */}
      <h2 className="text-2xl font-bold mb-4">Paper Score Sheet Template</h2>
      <p className="mb-4">If you prefer pen and paper, use this format:</p>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Round</th>
                <th className="px-4 py-3 font-semibold">Player 1</th>
                <th className="px-4 py-3 font-semibold">Player 2</th>
                <th className="px-4 py-3 font-semibold">Player 3</th>
                <th className="px-4 py-3 font-semibold">Player 4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">12</td><td className="px-4 py-2">8</td><td className="px-4 py-2">22</td><td className="px-4 py-2">15</td></tr>
              <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">6</td><td className="px-4 py-2">18</td><td className="px-4 py-2">4</td><td className="px-4 py-2">11</td></tr>
              <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">15</td><td className="px-4 py-2">7</td><td className="px-4 py-2">20</td><td className="px-4 py-2">9</td></tr>
              <tr className="font-bold text-foreground"><td className="px-4 py-2">Total</td><td className="px-4 py-2">33</td><td className="px-4 py-2">33</td><td className="px-4 py-2">46</td><td className="px-4 py-2">35</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <h2 className="text-2xl font-bold mb-4">Score Keeping Tips</h2>
      <ul className="space-y-2 mb-8">
        <li><strong>Record immediately.</strong> Enter scores right after each round — don't wait.</li>
        <li><strong>Double-check math.</strong> One wrong addition changes the whole game. Digital trackers eliminate this risk.</li>
        <li><strong>Note Dutch calls.</strong> Tracking who called Dutch (and whether it succeeded) adds context to the numbers.</li>
        <li><strong>Announce standings.</strong> Sharing current rankings after each round increases tension and fun.</li>
        <li><strong>Save the result.</strong> Take a photo of paper scores or use a digital tracker that saves automatically.</li>
      </ul>

      {/* Games This Applies To */}
      <h2 className="text-2xl font-bold mb-4">Card Games That Need Score Tracking</h2>
      <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {['Dutch / Cabo / Golf', 'Rummy', 'Hearts', 'Spades', 'Bridge', 'Phase 10', 'Uno (point variant)', 'Canasta'].map((game) => (
          <div key={game} className="p-3 rounded-lg glass-surface text-center text-sm font-medium">
            {game}
          </div>
        ))}
      </div>

      <p>
        <Link to="/score-tracker" className="text-primary hover:underline">Try our free score tracker</Link> or
        learn the <Link to="/dutch-rules" className="text-primary hover:underline">rules of Dutch</Link>.
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
