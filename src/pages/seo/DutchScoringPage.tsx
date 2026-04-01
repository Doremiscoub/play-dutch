import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { FAQSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';

const faqItems = [
  { question: 'How are points counted in Dutch?', answer: 'Each card has a point value: Ace = 1, numbered cards = face value, Jack/Queen = 10, Red King = 10, Black King = 0. At the end of a round, each player sums the values of their 4 cards.' },
  { question: 'What is the Dutch penalty?', answer: 'If a player calls Dutch but does not have the lowest score (someone ties or beats them), the caller receives a penalty — typically their score is doubled or extra points are added.' },
  { question: 'What is the best possible score in Dutch?', answer: 'The best possible score in a single round is 0 points, achieved by having four Black Kings (Spades and Clubs). Realistically, a score of 2-4 is excellent.' },
  { question: 'What score limit ends the game?', answer: 'The standard limit is 100 points. The first player to reach 100 loses. Common alternatives: 50 (quick), 75 (medium), 150 or 200 (long session).' },
];

export default function DutchScoringPage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'Dutch Card Game Scoring — Card Values, Points & Penalties',
        description:
          'Complete scoring guide for the Dutch card game. Card values, point calculations, Dutch penalty rules, and score limits explained with examples.',
        keywords:
          'dutch card game scoring, dutch card values, dutch points, dutch penalty, how to score dutch, card game scoring rules',
      }}
      breadcrumbs={[
        { label: 'Dutch Card Game', href: '/dutch-card-game' },
        { label: 'Scoring', href: '/dutch-scoring' },
      ]}
    >
      <FAQSchema items={faqItems} />
      <ArticleSchema
        title="Dutch Card Game Scoring Guide"
        description="Complete scoring reference for the Dutch card game."
        path="/dutch-scoring"
      />

      <h1 className="text-4xl font-bold mb-6">Dutch Card Game Scoring</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Scoring in Dutch is simple: <strong>lower is better</strong>. Here's every card value, the
        penalty system, and how to track scores across rounds.
      </p>

      {/* Card Values */}
      <h2 className="text-2xl font-bold mb-4">Card Point Values</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Card</th>
                <th className="px-4 py-3 font-semibold">Points</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3">Ace</td><td className="px-4 py-3">1</td><td className="px-4 py-3 text-muted-foreground">Lowest numbered card</td></tr>
              <tr><td className="px-4 py-3">2</td><td className="px-4 py-3">2</td><td className="px-4 py-3 text-muted-foreground">—</td></tr>
              <tr><td className="px-4 py-3">3</td><td className="px-4 py-3">3</td><td className="px-4 py-3 text-muted-foreground">—</td></tr>
              <tr><td className="px-4 py-3">4</td><td className="px-4 py-3">4</td><td className="px-4 py-3 text-muted-foreground">—</td></tr>
              <tr><td className="px-4 py-3">5</td><td className="px-4 py-3">5</td><td className="px-4 py-3 text-muted-foreground">—</td></tr>
              <tr><td className="px-4 py-3">6</td><td className="px-4 py-3">6</td><td className="px-4 py-3 text-muted-foreground">—</td></tr>
              <tr><td className="px-4 py-3">7</td><td className="px-4 py-3">7</td><td className="px-4 py-3 text-muted-foreground">Special: swap with opponent</td></tr>
              <tr><td className="px-4 py-3">8</td><td className="px-4 py-3">8</td><td className="px-4 py-3 text-muted-foreground">—</td></tr>
              <tr><td className="px-4 py-3">9</td><td className="px-4 py-3">9</td><td className="px-4 py-3 text-muted-foreground">Special: peek at own card</td></tr>
              <tr><td className="px-4 py-3">10</td><td className="px-4 py-3">10</td><td className="px-4 py-3 text-muted-foreground">Special: peek at own card</td></tr>
              <tr><td className="px-4 py-3">Jack</td><td className="px-4 py-3">10</td><td className="px-4 py-3 text-muted-foreground">Special: skip opponent</td></tr>
              <tr><td className="px-4 py-3">Queen</td><td className="px-4 py-3">10</td><td className="px-4 py-3 text-muted-foreground">—</td></tr>
              <tr><td className="px-4 py-3">Red King (Hearts/Diamonds)</td><td className="px-4 py-3">10</td><td className="px-4 py-3 text-muted-foreground">—</td></tr>
              <tr className="bg-green-500/5"><td className="px-4 py-3 font-bold">Black King (Spades/Clubs)</td><td className="px-4 py-3 font-bold text-green-500">0</td><td className="px-4 py-3 font-bold text-green-500">Best card — keep it!</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Score Examples */}
      <h2 className="text-2xl font-bold mb-4">Scoring Examples</h2>
      <div className="not-prose mb-8 space-y-4">
        <div className="p-5 rounded-xl glass-surface">
          <p className="font-medium mb-2">Example 1: Great hand</p>
          <p className="text-muted-foreground">Ace (1) + 2 (2) + Black King (0) + 3 (3) = <strong className="text-green-500">6 points</strong></p>
        </div>
        <div className="p-5 rounded-xl glass-surface">
          <p className="font-medium mb-2">Example 2: Average hand</p>
          <p className="text-muted-foreground">5 (5) + 8 (8) + Queen (10) + Ace (1) = <strong className="text-yellow-500">24 points</strong></p>
        </div>
        <div className="p-5 rounded-xl glass-surface">
          <p className="font-medium mb-2">Example 3: Bad hand</p>
          <p className="text-muted-foreground">Queen (10) + Jack (10) + Red King (10) + 9 (9) = <strong className="text-red-500">39 points</strong></p>
        </div>
      </div>

      {/* Dutch Penalty */}
      <h2 className="text-2xl font-bold mb-4">The Dutch Penalty</h2>
      <p className="mb-4">
        Calling Dutch is a gamble. If you <strong>don't have the lowest score</strong>, you get
        penalized:
      </p>
      <ul className="space-y-2 mb-6">
        <li><strong>Standard penalty:</strong> Your round score is doubled.</li>
        <li><strong>Variant penalty:</strong> Add a flat 10–20 point penalty (house rules).</li>
        <li><strong>Risk vs reward:</strong> A failed Dutch at 8 points becomes 16 — worse than not calling at all.</li>
      </ul>

      {/* Score Limits */}
      <h2 className="text-2xl font-bold mb-4">Game Score Limits</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Limit</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
                <th className="px-4 py-3 font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3">50 points</td><td className="px-4 py-3">15–20 min</td><td className="px-4 py-3 text-muted-foreground">Quick game, beginners</td></tr>
              <tr><td className="px-4 py-3">75 points</td><td className="px-4 py-3">25–35 min</td><td className="px-4 py-3 text-muted-foreground">Medium session</td></tr>
              <tr><td className="px-4 py-3 font-medium">100 points</td><td className="px-4 py-3">30–45 min</td><td className="px-4 py-3 text-muted-foreground">Standard game</td></tr>
              <tr><td className="px-4 py-3">150–200 points</td><td className="px-4 py-3">60+ min</td><td className="px-4 py-3 text-muted-foreground">Long session, tournaments</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <p>
        Track scores automatically with our{' '}
        <Link to="/score-tracker" className="text-primary hover:underline">free score tracker</Link>.
        It handles calculations, cumulative totals, and statistics for every player.
      </p>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mb-4">Scoring FAQ</h2>
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
