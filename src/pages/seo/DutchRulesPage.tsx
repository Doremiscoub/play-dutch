import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { FAQSchema, HowToSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';

const faqItems = [
  { question: 'What happens when someone calls Dutch?', answer: 'When a player calls "Dutch," every other player gets one final turn. Then all cards are revealed and scores counted. If the caller has the lowest score, others score normally. If someone else ties or beats the caller, the caller receives a penalty.' },
  { question: 'Can you pick up from the discard pile?', answer: 'Yes. On your turn you may draw from the deck or take the top card of the discard pile. Taking from the discard pile lets you know exactly what you are getting.' },
  { question: 'What are the special card powers in Dutch?', answer: '7 lets you swap one of your cards with an opponent\'s card (blind). 9 and 10 let you peek at one of your own hidden cards. Jack lets you skip another player\'s turn.' },
  { question: 'How many cards does each player get?', answer: 'Each player is dealt 4 cards face-down. At the start of each round, every player may peek at exactly 2 of their own cards.' },
];

const howToSteps = [
  { name: 'Deal the cards', text: 'Shuffle a standard 52-card deck. Deal 4 cards face-down to each player. Place the remaining cards in a draw pile and flip one card to start the discard pile.' },
  { name: 'Peek at two cards', text: 'Each player secretly looks at 2 of their 4 face-down cards, then places them back without revealing them to others.' },
  { name: 'Take turns', text: 'On your turn, draw the top card from the draw pile or the discard pile. Then either swap it with one of your face-down cards or discard it.' },
  { name: 'Use special powers', text: 'If you play a 7, swap one card with an opponent. If you play a 9 or 10, peek at one of your hidden cards. If you play a Jack, skip another player\'s turn.' },
  { name: 'Call Dutch', text: 'When you believe you have the lowest total score, say "Dutch!" on your turn. Every other player gets one final turn.' },
  { name: 'Reveal and score', text: 'All players flip their cards. Add up each player\'s card values. The player with the lowest score wins the round. If the Dutch caller doesn\'t have the lowest score, they receive a penalty.' },
];

export default function DutchRulesPage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'Dutch Card Game Rules — Complete Official Rules & Guide',
        description:
          'Learn the complete rules of the Dutch card game: dealing, turns, special card powers, calling Dutch, and scoring. Step-by-step guide for beginners and experienced players.',
        keywords:
          'dutch card game rules, how to play dutch, dutch rules, dutch card game instructions, cabo rules, golf card game rules',
      }}
      breadcrumbs={[
        { label: 'Dutch Card Game', href: '/dutch-card-game' },
        { label: 'Rules', href: '/dutch-rules' },
      ]}
    >
      <HowToSchema
        name="How to Play the Dutch Card Game"
        description="Complete step-by-step rules for the Dutch card game, from dealing to scoring."
        steps={howToSteps}
        totalTime="PT5M"
      />
      <FAQSchema items={faqItems} />
      <ArticleSchema
        title="Dutch Card Game Rules"
        description="Complete official rules of the Dutch card game."
        path="/dutch-rules"
      />

      <h1 className="text-4xl font-bold mb-6">Dutch Card Game Rules</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Everything you need to know to play Dutch. This guide covers setup, gameplay, special card
        powers, and scoring — with examples.
      </p>

      {/* Objective */}
      <h2 className="text-2xl font-bold mb-3">Objective</h2>
      <p className="mb-6">
        Get the <strong>lowest total score</strong> across multiple rounds. The first player to
        reach the point limit (usually 100) <em>loses</em>. Everyone else wins.
      </p>

      {/* Setup */}
      <h2 className="text-2xl font-bold mb-3">Setup</h2>
      <ul className="space-y-2 mb-6">
        <li>Use a <strong>standard 52-card deck</strong>.</li>
        <li>Deal <strong>4 cards face-down</strong> to each player in a row.</li>
        <li>Place the remaining cards as a <strong>draw pile</strong>.</li>
        <li>Flip the top card of the draw pile to start the <strong>discard pile</strong>.</li>
        <li>Each player <strong>peeks at 2</strong> of their 4 cards, then places them back face-down.</li>
      </ul>

      {/* Gameplay */}
      <h2 className="text-2xl font-bold mb-3">Gameplay — Turn by Turn</h2>
      <p className="mb-4">Play proceeds clockwise. On your turn:</p>
      <ol className="space-y-3 mb-6">
        <li>
          <strong>Draw a card</strong> from the draw pile or the discard pile.
        </li>
        <li>
          <strong>Choose one option:</strong>
          <ul className="mt-2 space-y-1 ml-4">
            <li>Swap the drawn card with one of your face-down cards (place the old card on the discard pile).</li>
            <li>Discard the drawn card directly.</li>
          </ul>
        </li>
        <li>
          If the card you played has a <strong>special power</strong>, activate it now.
        </li>
      </ol>

      {/* Special Cards */}
      <h2 className="text-2xl font-bold mb-3">Special Card Powers</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Card</th>
                <th className="px-4 py-3 font-semibold">Power</th>
                <th className="px-4 py-3 font-semibold">When to Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">7</td>
                <td className="px-4 py-3">Swap one of your cards with an opponent's (blind)</td>
                <td className="px-4 py-3 text-muted-foreground">Dump a high card early; hope for a low swap</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">9 / 10</td>
                <td className="px-4 py-3">Peek at one of your own hidden cards</td>
                <td className="px-4 py-3 text-muted-foreground">Reduce uncertainty before calling Dutch</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Jack</td>
                <td className="px-4 py-3">Skip another player's turn</td>
                <td className="px-4 py-3 text-muted-foreground">Block a player about to call Dutch</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Calling Dutch */}
      <h2 className="text-2xl font-bold mb-3">Calling "Dutch"</h2>
      <p className="mb-4">
        When you believe you have the <strong>lowest total score</strong> among all players, say
        <strong> "Dutch!"</strong> on your turn.
      </p>
      <ul className="space-y-2 mb-6">
        <li>All other players get <strong>one final turn</strong>.</li>
        <li>Then every player <strong>reveals their 4 cards</strong>.</li>
        <li>If the Dutch caller has the lowest score → others score normally.</li>
        <li>If someone <strong>ties or beats</strong> the caller → the caller gets a <strong>penalty</strong> (extra points added to their score).</li>
      </ul>

      {/* Scoring */}
      <h2 className="text-2xl font-bold mb-3">Scoring</h2>
      <p className="mb-4">
        After revealing, add up each player's card values. See the{' '}
        <Link to="/dutch-scoring" className="text-primary hover:underline">full scoring guide</Link>{' '}
        for card values and penalty details.
      </p>
      <p className="mb-6">
        Use our <Link to="/score-tracker" className="text-primary hover:underline">free score tracker</Link> to
        automate calculations across rounds.
      </p>

      {/* Tips */}
      <h2 className="text-2xl font-bold mb-3">Quick Tips for Beginners</h2>
      <ul className="space-y-2 mb-8">
        <li><strong>Memorize your cards.</strong> Always track which cards you've seen.</li>
        <li><strong>Watch the discard pile.</strong> If 3 Black Kings have appeared, the 4th is somewhere in play.</li>
        <li><strong>Don't rush Dutch.</strong> A wrong call adds a penalty — patience pays off.</li>
        <li><strong>Use 7s aggressively early.</strong> Opponents haven't optimized yet, so blind swaps are lower risk.</li>
      </ul>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mb-4">Rules FAQ</h2>
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
