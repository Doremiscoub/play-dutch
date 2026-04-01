import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { HowToSchema, FAQSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';
import { FAQSection } from '@/components/seo/FAQSection';
import { StepList } from '@/components/seo/StepList';

const howToSteps = [
  { name: 'Gather players and a deck', text: 'You need 2-10 players and a standard 52-card deck. Sit in a circle or around a table. Choose a dealer.' },
  { name: 'Deal 4 cards to each player', text: 'The dealer shuffles the deck and deals 4 cards face-down to each player, one at a time. Players arrange their cards in a row without looking at them.' },
  { name: 'Set up the draw and discard piles', text: 'Place the remaining cards face-down in the center as the draw pile. Flip the top card face-up next to it — this starts the discard pile.' },
  { name: 'Peek at 2 of your cards', text: 'Each player secretly looks at 2 of their 4 face-down cards. Memorize them, then place them back face-down. This is the only free peek you get.' },
  { name: 'Play your turn', text: 'Draw the top card from either the draw pile or the discard pile. Then either: (a) swap it with one of your face-down cards and discard the old card, or (b) discard the drawn card without swapping.' },
  { name: 'Use special card powers', text: 'When you play (discard) a 7, swap one of your cards with an opponent blindly. When you play a 9 or 10, peek at one of your hidden cards. When you play a Jack, skip another player\'s next turn.' },
  { name: 'Call Dutch when ready', text: 'When you believe your 4 cards have the lowest total value, say "Dutch!" on your turn instead of drawing. Every other player gets one last turn.' },
  { name: 'Reveal cards and count scores', text: 'All players flip their 4 cards face-up. Add the point values: Ace=1, 2-10=face value, Jack/Queen=10, Red King=10, Black King=0. Lowest score wins the round.' },
  { name: 'Apply penalty if needed', text: 'If the Dutch caller does NOT have the lowest (or tied lowest) score, they receive a penalty — typically their score is doubled. This discourages premature Dutch calls.' },
  { name: 'Play multiple rounds', text: 'Scores accumulate across rounds. The first player to reach the score limit (typically 100 points) loses the game. Everyone else wins.' },
];

const faqItems = [
  { question: 'How do you play Dutch step by step?', answer: 'Deal 4 cards face-down to each player. Each player peeks at 2 cards. On your turn, draw from the deck or discard pile, then swap with a face-down card or discard. Use special cards (7=swap with opponent, 9/10=peek, Jack=skip). Call "Dutch" when you think you have the lowest score. Reveal cards, count points. Lowest wins.' },
  { question: 'How many cards do you start with in Dutch?', answer: 'Each player starts with 4 face-down cards and may peek at exactly 2 of them at the beginning of each round.' },
  { question: 'What do you say to end a round of Dutch?', answer: 'You say "Dutch!" on your turn. This signals that you believe you have the lowest score. Each other player gets one final turn, then all cards are revealed.' },
  { question: 'Can you play Dutch with 2 players?', answer: 'Yes, Dutch works with 2 players. Games are faster and more strategic with 2 players since you can track your opponent\'s moves more easily. The ideal player count is 4-6 for the best social experience.' },
];

export default function HowToPlayDutchPage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'How to Play Dutch — Step-by-Step Guide for Beginners',
        description:
          'Learn how to play the Dutch card game in 10 easy steps. Complete beginner guide with dealing, turns, special cards, calling Dutch, and scoring explained.',
        keywords:
          'how to play dutch, dutch card game tutorial, learn dutch card game, dutch card game for beginners, play dutch step by step, dutch card game guide',
      }}
      breadcrumbs={[
        { label: 'Dutch Card Game', href: '/dutch-card-game' },
        { label: 'How to Play', href: '/how-to-play-dutch' },
      ]}
      ctaText="Start a Game Now"
    >
      <HowToSchema
        name="How to Play the Dutch Card Game"
        description="Complete step-by-step beginner guide to playing the Dutch card game."
        steps={howToSteps}
        totalTime="PT5M"
      />
      <FAQSchema items={faqItems} />
      <ArticleSchema
        title="How to Play Dutch — Step-by-Step Guide"
        description="Beginner-friendly guide to playing the Dutch card game."
        path="/how-to-play-dutch"
      />

      <h1 className="text-4xl font-bold mb-6">How to Play Dutch: Step-by-Step Guide</h1>

      <p className="text-lg text-muted-foreground mb-8">
        Dutch is easy to learn. This guide walks you through every step — from dealing to scoring —
        so you can start playing in <strong>5 minutes</strong>.
      </p>

      {/* What You Need */}
      <h2 className="text-2xl font-bold mb-3">What You Need</h2>
      <ul className="space-y-1 mb-8">
        <li><strong>Players:</strong> 2–10 (best with 4–6)</li>
        <li><strong>Deck:</strong> Standard 52-card deck (no jokers for basic rules)</li>
        <li><strong>Time:</strong> 30–45 minutes for a full game</li>
        <li><strong>Optional:</strong> <Link to="/score-tracker" className="text-primary hover:underline">Score tracker app</Link> (replaces pen & paper)</li>
      </ul>

      {/* Step-by-Step */}
      <h2 className="text-2xl font-bold mb-4">Step-by-Step Instructions</h2>
      <StepList steps={howToSteps} />

      {/* Quick Reference Card */}
      <h2 className="text-2xl font-bold mb-4">Quick Reference: Card Values</h2>
      <div className="not-prose mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { card: 'Ace', pts: '1 pt' },
            { card: '2–6', pts: 'Face value' },
            { card: '7', pts: '7 pts + Swap' },
            { card: '8', pts: '8 pts' },
            { card: '9–10', pts: '9–10 pts + Peek' },
            { card: 'Jack', pts: '10 pts + Skip' },
            { card: 'Queen', pts: '10 pts' },
            { card: 'Red King', pts: '10 pts' },
            { card: 'Black King', pts: '0 pts!' },
          ].map((c) => (
            <div key={c.card} className="p-3 rounded-lg glass-surface text-center">
              <div className="font-bold text-sm">{c.card}</div>
              <div className="text-xs text-muted-foreground">{c.pts}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Common Mistakes */}
      <h2 className="text-2xl font-bold mb-4">Common Beginner Mistakes</h2>
      <ul className="space-y-2 mb-8">
        <li><strong>Forgetting your cards.</strong> As soon as you peek, commit the positions to memory. Say them in your head: "left = 3, second = King."</li>
        <li><strong>Calling Dutch too early.</strong> A premature Dutch with a score of 12 could become 24 with the penalty. Wait until you're confident.</li>
        <li><strong>Ignoring the discard pile.</strong> Picking from the discard pile guarantees you know what you're getting. The draw pile is a gamble.</li>
        <li><strong>Wasting peek cards.</strong> Don't peek at a card you already know. Use 9/10 to reveal your unknown cards.</li>
      </ul>

      {/* Strategy Preview */}
      <h2 className="text-2xl font-bold mb-4">Beginner Strategy Tips</h2>
      <ol className="space-y-2 mb-8">
        <li><strong>Know 3 of 4 cards</strong> before considering a Dutch call.</li>
        <li><strong>Use 7s early</strong> to dump high cards onto opponents who haven't optimized yet.</li>
        <li><strong>Track discards</strong> — if 3 Black Kings are gone, the 4th is in someone's hand.</li>
        <li><strong>Watch opponents</strong> — hesitation usually means a strong hand (possible Dutch).</li>
      </ol>

      <p>
        Want deeper strategy? Read our{' '}
        <Link to="/dutch-rules" className="text-primary hover:underline">complete rules</Link> and{' '}
        <Link to="/dutch-scoring" className="text-primary hover:underline">scoring guide</Link>.
      </p>

      <FAQSection items={faqItems} />
    </SEOPageLayout>
  );
}
