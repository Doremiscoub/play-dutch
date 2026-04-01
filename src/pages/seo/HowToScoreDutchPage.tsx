import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { HowToSchema, FAQSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';
import { FAQSection } from '@/components/seo/FAQSection';
import { StepList } from '@/components/seo/StepList';

const howToSteps = [
  { name: 'Reveal all cards', text: 'When a round ends (after a Dutch call and the final turn), all players flip their 4 cards face-up.' },
  { name: 'Add each card\'s value', text: 'Sum the point values of all 4 cards: Ace = 1, numbered cards = face value, Jack/Queen = 10, Red King = 10, Black King = 0.' },
  { name: 'Check for the Dutch penalty', text: 'If the player who called Dutch does NOT have the lowest (or tied lowest) score, their round score is doubled as a penalty.' },
  { name: 'Record each player\'s score', text: 'Add each player\'s round score to their cumulative total. Use our free score tracker app for automatic calculations.' },
  { name: 'Check for game over', text: 'If any player\'s cumulative score reaches the limit (default: 100), the game ends. That player loses. Everyone else wins.' },
];

const faqItems = [
  { question: 'How do you score Dutch?', answer: 'After each round, all players reveal their 4 cards. Add the point values: Ace=1, 2-10=face value, Jack/Queen=10, Red King=10, Black King=0. If the Dutch caller doesn\'t have the lowest score, their points are doubled. Scores accumulate across rounds until someone hits the limit (usually 100).' },
  { question: 'What is the difference between Red King and Black King?', answer: 'The Black King (Spades and Clubs) is worth 0 points — the best card in the game. The Red King (Hearts and Diamonds) is worth 10 points — one of the worst. This distinction is crucial for strategy.' },
  { question: 'What happens if two players tie for lowest score?', answer: 'If the Dutch caller ties with another player for the lowest score, the Dutch call is considered successful and no penalty applies. If a non-caller ties with the caller, the caller is safe.' },
  { question: 'How do you keep score across multiple rounds?', answer: 'Scores are cumulative. After each round, add the new round score to each player\'s running total. The game ends when any player reaches the score limit (commonly 100 points). Use a digital score tracker for automatic calculations.' },
];

export default function HowToScoreDutchPage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'How to Score Dutch — Card Values, Penalties & Score Tracking',
        description:
          'Step-by-step guide to scoring the Dutch card game. Card point values, the Dutch penalty, cumulative scoring, and how to use a free digital score tracker.',
        keywords:
          'how to score dutch, dutch scoring system, dutch card game points, dutch penalty scoring, score dutch card game, dutch card values points',
      }}
      breadcrumbs={[
        { label: 'Dutch Card Game', href: '/dutch-card-game' },
        { label: 'How to Score', href: '/how-to-score-dutch' },
      ]}
      ctaText="Track Scores Automatically"
      ctaHref="/setup"
    >
      <HowToSchema
        name="How to Score the Dutch Card Game"
        description="Step-by-step scoring guide for the Dutch card game including card values and penalties."
        steps={howToSteps}
        totalTime="PT2M"
      />
      <FAQSchema items={faqItems} />
      <ArticleSchema
        title="How to Score Dutch"
        description="Complete scoring guide for the Dutch card game."
        path="/how-to-score-dutch"
      />

      <h1 className="text-4xl font-bold mb-6">How to Score Dutch</h1>

      {/* Direct answer */}
      <div className="not-prose p-6 rounded-xl glass-elevated mb-8 border-l-4 border-primary">
        <p className="text-lg leading-relaxed">
          <strong>To score Dutch:</strong> reveal all 4 cards, sum their values (Ace=1, 2–10=face
          value, J/Q=10, Red K=10, Black K=0). If the Dutch caller doesn't have the lowest
          score, their points are <strong>doubled</strong>. Add round scores to cumulative totals.
          First to 100 loses.
        </p>
      </div>

      {/* Step-by-Step */}
      <h2 className="text-2xl font-bold mb-4">Scoring Step by Step</h2>
      <StepList steps={howToSteps} />

      {/* Card Values */}
      <h2 className="text-2xl font-bold mb-4">Complete Card Values</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Card</th>
                <th className="px-4 py-3 font-semibold">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3">Ace</td><td className="px-4 py-3">1</td></tr>
              <tr><td className="px-4 py-3">2–10</td><td className="px-4 py-3">Face value</td></tr>
              <tr><td className="px-4 py-3">Jack</td><td className="px-4 py-3">10</td></tr>
              <tr><td className="px-4 py-3">Queen</td><td className="px-4 py-3">10</td></tr>
              <tr><td className="px-4 py-3">Red King (Hearts / Diamonds)</td><td className="px-4 py-3">10</td></tr>
              <tr className="bg-green-500/5"><td className="px-4 py-3 font-bold">Black King (Spades / Clubs)</td><td className="px-4 py-3 font-bold text-green-500">0</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The Penalty */}
      <h2 className="text-2xl font-bold mb-4">Understanding the Dutch Penalty</h2>
      <p className="mb-4">The penalty exists to prevent reckless Dutch calls.</p>
      <div className="not-prose space-y-3 mb-8">
        <div className="p-4 rounded-xl glass-surface border-l-4 border-green-500">
          <p className="font-medium">Successful Dutch (caller has lowest score)</p>
          <p className="text-sm text-muted-foreground">All other players score normally. Caller scores their card total.</p>
        </div>
        <div className="p-4 rounded-xl glass-surface border-l-4 border-red-500">
          <p className="font-medium">Failed Dutch (someone ties or beats the caller)</p>
          <p className="text-sm text-muted-foreground">Caller's round score is doubled. Other players score normally.</p>
        </div>
      </div>

      {/* Examples */}
      <h2 className="text-2xl font-bold mb-4">Scoring Examples</h2>
      <div className="not-prose space-y-4 mb-8">
        <div className="p-5 rounded-xl glass-surface">
          <p className="font-medium mb-2">Round example — 3 players</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Alice (called Dutch): Ace + 2 + Black King + 3 = <strong>6 pts</strong></li>
            <li>Bob: 5 + 8 + Queen + 4 = <strong>27 pts</strong></li>
            <li>Carol: 7 + 3 + 6 + 9 = <strong>25 pts</strong></li>
          </ul>
          <p className="text-sm mt-2">Alice has the lowest — Dutch is successful. Scores: Alice 6, Carol 25, Bob 27.</p>
        </div>
        <div className="p-5 rounded-xl glass-surface">
          <p className="font-medium mb-2">Failed Dutch example</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Alice (called Dutch): 3 + 5 + 2 + Ace = <strong>11 pts</strong></li>
            <li>Bob: Ace + 2 + Black King + 4 = <strong>7 pts</strong></li>
          </ul>
          <p className="text-sm mt-2">Bob beats Alice. Dutch penalty: Alice scores 11 x 2 = <strong className="text-red-500">22 pts</strong>.</p>
        </div>
      </div>

      {/* Digital Tracking */}
      <h2 className="text-2xl font-bold mb-4">Use a Digital Score Tracker</h2>
      <p className="mb-4">
        Manual score tracking across rounds is tedious and error-prone. Our{' '}
        <Link to="/score-tracker" className="text-primary hover:underline">free score tracker</Link>{' '}
        handles everything automatically:
      </p>
      <ul className="space-y-1 mb-4">
        <li>Auto-calculates cumulative totals</li>
        <li>Tracks Dutch calls and penalties</li>
        <li>Shows per-player statistics (average, best, trend)</li>
        <li>Saves game history for future reference</li>
        <li>Works offline on any device</li>
      </ul>
      <p className="mb-8">
        Learn more in our{' '}
        <Link to="/how-to-keep-score-card-games" className="text-primary hover:underline">guide to keeping score in card games</Link>.
      </p>

      <FAQSection items={faqItems} />
    </SEOPageLayout>
  );
}
