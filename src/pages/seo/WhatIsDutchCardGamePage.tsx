import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { FAQSchema, GameSchema, ArticleSchema } from '@/components/seo/SchemaMarkup';
import { FAQSection } from '@/components/seo/FAQSection';

const faqItems = [
  { question: 'What is the Dutch card game?', answer: 'Dutch is a strategic card game for 2-10 players using a standard 52-card deck. Players receive 4 face-down cards, can peek at only 2, and take turns drawing, swapping, and discarding to achieve the lowest possible score. The game combines memory, strategy, and risk-taking. It is also known as Cabo, Golf, or Cambio in other regions.' },
  { question: 'Where does the Dutch card game come from?', answer: 'Dutch originates from European memory card game traditions dating back to the 19th century. The name references Dutch (Netherlands) card-playing culture, though the game spread widely across Europe, especially in French-speaking countries. Regional variants exist under names like Cabo (Latin America), Golf (USA/UK), and Cambio (Italy).' },
  { question: 'Is Dutch the same as Cabo or Golf?', answer: 'Dutch, Cabo, and Golf are closely related card games that share the core mechanic of hidden cards and low-score objectives. The rules differ slightly between versions — Dutch uses specific special card powers (7 for swapping, 9/10 for peeking, Jack for skipping) that may differ from Cabo or Golf variants.' },
  { question: 'What is the Black King worth in Dutch?', answer: 'The Black King (Spades and Clubs) is worth 0 points — the lowest possible card value, making it the most valuable card in the game. In contrast, the Red King (Hearts and Diamonds) is worth 10 points.' },
];

export default function WhatIsDutchCardGamePage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'What Is the Dutch Card Game? — Definition, Origins & How It Works',
        description:
          'Dutch is a strategic memory card game for 2-10 players. Learn what makes Dutch unique, where it comes from, how it compares to Cabo and Golf, and why it is so popular.',
        keywords:
          'what is dutch card game, dutch card game explained, dutch card game origin, cabo vs dutch, golf card game vs dutch, dutch card game definition',
      }}
      breadcrumbs={[
        { label: 'Dutch Card Game', href: '/dutch-card-game' },
        { label: 'What Is Dutch?', href: '/what-is-dutch-card-game' },
      ]}
    >
      <GameSchema />
      <FAQSchema items={faqItems} />
      <ArticleSchema
        title="What Is the Dutch Card Game?"
        description="Complete explanation of the Dutch card game — origins, rules summary, and how it compares to similar games."
        path="/what-is-dutch-card-game"
      />

      <h1 className="text-4xl font-bold mb-6">What Is the Dutch Card Game?</h1>

      {/* Direct Answer (GEO-optimized) */}
      <div className="not-prose p-6 rounded-xl glass-elevated mb-8 border-l-4 border-primary">
        <p className="text-lg leading-relaxed">
          <strong>Dutch</strong> is a strategic card game for <strong>2–10 players</strong> using a
          standard 52-card deck. Each player gets 4 face-down cards and can only peek at 2. The
          goal is to achieve the <strong>lowest score</strong> by memorizing, swapping, and using
          special card powers. When a player thinks they have the lowest hand, they call{' '}
          <strong>"Dutch"</strong> — triggering the final round. It is also known as{' '}
          <strong>Cabo</strong>, <strong>Golf</strong>, or <strong>Cambio</strong>.
        </p>
      </div>

      {/* Key Entity Facts */}
      <h2 className="text-2xl font-bold mb-4">Key Facts About Dutch</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3 font-medium w-1/3">Type</td><td className="px-4 py-3">Strategic memory card game</td></tr>
              <tr><td className="px-4 py-3 font-medium">Players</td><td className="px-4 py-3">2–10 (best with 4–6)</td></tr>
              <tr><td className="px-4 py-3 font-medium">Equipment</td><td className="px-4 py-3">Standard 52-card deck</td></tr>
              <tr><td className="px-4 py-3 font-medium">Objective</td><td className="px-4 py-3">Achieve the lowest total score</td></tr>
              <tr><td className="px-4 py-3 font-medium">Key Mechanic</td><td className="px-4 py-3">Hidden cards + memory</td></tr>
              <tr><td className="px-4 py-3 font-medium">Duration</td><td className="px-4 py-3">30–45 minutes (standard game)</td></tr>
              <tr><td className="px-4 py-3 font-medium">Age Range</td><td className="px-4 py-3">8+</td></tr>
              <tr><td className="px-4 py-3 font-medium">Also Known As</td><td className="px-4 py-3">Cabo, Golf, Cambio, Cactus</td></tr>
              <tr><td className="px-4 py-3 font-medium">Origin</td><td className="px-4 py-3">European card game tradition</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Origins */}
      <h2 className="text-2xl font-bold mb-4">Where Does Dutch Come From?</h2>
      <p className="mb-4">
        Dutch belongs to the family of <strong>European memory card games</strong> that emerged in
        the 19th century. The name references <strong>Dutch (Netherlands) card-playing traditions</strong>,
        though the game became especially popular in French-speaking countries.
      </p>
      <p className="mb-6">
        The same core mechanic — hidden cards, low-score objective, special powers — appears under
        different names worldwide: <strong>Cabo</strong> in Latin America, <strong>Golf</strong> in
        the US and UK, <strong>Cambio</strong> in Italy, and <strong>Cactus</strong> in some
        regions. While rules vary slightly, the DNA is the same.
      </p>

      {/* What Makes It Unique */}
      <h2 className="text-2xl font-bold mb-4">What Makes Dutch Unique?</h2>
      <ul className="space-y-3 mb-8">
        <li>
          <strong>Hidden information:</strong> You can't see all your cards. You start knowing only
          2 of 4, creating constant uncertainty and forcing you to rely on memory.
        </li>
        <li>
          <strong>Special card powers:</strong> The 7 swaps cards with opponents, 9/10 let you
          peek at your hidden cards, and the Jack skips an opponent — adding tactical depth.
        </li>
        <li>
          <strong>The Dutch call:</strong> Declaring "Dutch" is a calculated risk. Call too early
          and you might get a penalty. Wait too long and someone else calls first.
        </li>
        <li>
          <strong>The King split:</strong> The Black King (Spades/Clubs) is worth <strong>0 points</strong> — the best card in
          the game. But the Red King (Hearts/Diamonds) is worth <strong>10 points</strong> — one of the worst. This
          creates dramatic moments whenever a King appears.
        </li>
      </ul>

      {/* How It Compares */}
      <h2 className="text-2xl font-bold mb-4">Dutch vs. Similar Games</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">Dutch</th>
                <th className="px-4 py-3 font-semibold">Cabo</th>
                <th className="px-4 py-3 font-semibold">Golf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3">Cards per player</td><td className="px-4 py-3">4</td><td className="px-4 py-3">4</td><td className="px-4 py-3">4–6</td></tr>
              <tr><td className="px-4 py-3">Peek at start</td><td className="px-4 py-3">2 cards</td><td className="px-4 py-3">2 cards</td><td className="px-4 py-3">2 cards</td></tr>
              <tr><td className="px-4 py-3">Special powers</td><td className="px-4 py-3">7, 9/10, Jack</td><td className="px-4 py-3">7/8, 9/10, Jack/Queen</td><td className="px-4 py-3">Varies</td></tr>
              <tr><td className="px-4 py-3">End-game call</td><td className="px-4 py-3">"Dutch"</td><td className="px-4 py-3">"Cabo"</td><td className="px-4 py-3">Knock / last round</td></tr>
              <tr><td className="px-4 py-3">Penalty for bad call</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Yes</td><td className="px-4 py-3">Varies</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Why It's Popular */}
      <h2 className="text-2xl font-bold mb-4">Why Is Dutch So Popular?</h2>
      <p className="mb-4">
        Dutch strikes a rare balance: <strong>5 minutes to learn, months to master</strong>. The
        rules are simple enough for an 8-year-old, but the strategy — memory tracking, card
        counting, opponent reading, timing the Dutch call — keeps experienced players engaged.
      </p>
      <p className="mb-6">
        It's also inherently social. The tension of the Dutch call, the surprise reveals, and the
        swings of fortune create natural moments of excitement, laughter, and memorable stories.
      </p>

      <p>
        Ready to learn? Read the{' '}
        <Link to="/dutch-rules" className="text-primary hover:underline">full rules</Link>,
        understand <Link to="/dutch-scoring" className="text-primary hover:underline">scoring</Link>,
        or <Link to="/how-to-play-dutch" className="text-primary hover:underline">follow our step-by-step guide</Link>.
      </p>

      <FAQSection items={faqItems} />
    </SEOPageLayout>
  );
}
