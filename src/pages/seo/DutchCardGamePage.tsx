import React from 'react';
import { Link } from 'react-router-dom';
import SEOPageLayout from '@/components/seo/SEOPageLayout';
import { GameSchema, SoftwareAppSchema, FAQSchema } from '@/components/seo/SchemaMarkup';

const faqItems = [
  {
    question: 'What is the Dutch card game?',
    answer: 'Dutch is a strategic card game played with a standard 52-card deck where 2-10 players try to achieve the lowest score by memorizing, swapping, and revealing hidden cards. It is also known as Cabo or Golf in some regions.',
  },
  {
    question: 'How many players can play Dutch?',
    answer: 'Dutch can be played with 2 to 10 players. The ideal number is 4 to 6 players for the best balance of strategy and fun.',
  },
  {
    question: 'Is Dutch suitable for children?',
    answer: 'Yes, Dutch is family-friendly and suitable for ages 8 and up. The memory and strategy elements make it educational and engaging for younger players.',
  },
  {
    question: 'How long does a game of Dutch take?',
    answer: 'A typical game of Dutch takes 30 to 45 minutes with 4 players at the standard 100-point limit. Shorter games can be played with a 50-point limit (15-20 minutes).',
  },
];

export default function DutchCardGamePage() {
  return (
    <SEOPageLayout
      seo={{
        title: 'Dutch Card Game — Rules, Strategy & Free Score Tracker App',
        description:
          'Dutch is a strategic card game for 2-10 players. Learn the rules, master scoring, and track your games with our free AI-powered companion app.',
        keywords:
          'dutch card game, dutch card game rules, dutch card game app, cabo card game, golf card game, card game score tracker',
      }}
      breadcrumbs={[{ label: 'Dutch Card Game', href: '/dutch-card-game' }]}
    >
      <GameSchema />
      <SoftwareAppSchema />
      <FAQSchema items={faqItems} />

      <h1 className="text-4xl font-bold mb-6">
        Dutch Card Game: The Complete Guide
      </h1>

      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        <strong>Dutch</strong> is a strategic card game where 2–10 players compete to get the
        lowest score by memorizing and swapping hidden cards. Simple to learn, deep to master — and
        now with a <Link to="/score-tracker" className="text-primary hover:underline">free score tracking app</Link>.
      </p>

      {/* Quick Facts Table */}
      <div className="not-prose mb-10">
        <h2 className="text-2xl font-bold mb-4">Quick Facts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3 font-medium w-1/3">Players</td><td className="px-4 py-3">2–10</td></tr>
              <tr><td className="px-4 py-3 font-medium">Ideal Group</td><td className="px-4 py-3">4–6 players</td></tr>
              <tr><td className="px-4 py-3 font-medium">Equipment</td><td className="px-4 py-3">Standard 52-card deck</td></tr>
              <tr><td className="px-4 py-3 font-medium">Game Length</td><td className="px-4 py-3">30–45 minutes</td></tr>
              <tr><td className="px-4 py-3 font-medium">Age Range</td><td className="px-4 py-3">8+</td></tr>
              <tr><td className="px-4 py-3 font-medium">Skill Type</td><td className="px-4 py-3">Memory, strategy, bluffing</td></tr>
              <tr><td className="px-4 py-3 font-medium">Also Known As</td><td className="px-4 py-3">Cabo, Golf, Cambio</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* What Makes Dutch Special */}
      <h2 className="text-2xl font-bold mb-4">What Makes Dutch Special?</h2>
      <p>
        Unlike most card games, Dutch challenges your <strong>memory</strong> as much as your
        strategy. Each player starts with 4 face-down cards and can only peek at 2. The rest of
        the game is about gathering information, making smart swaps, and choosing the perfect
        moment to call "Dutch."
      </p>

      <div className="not-prose my-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Memory', desc: 'Remember your hidden cards and track what opponents discard.' },
          { title: 'Strategy', desc: 'Use special card powers to swap, peek, and block opponents.' },
          { title: 'Timing', desc: 'Call "Dutch" at the right moment — too early or late costs points.' },
        ].map((item) => (
          <div key={item.title} className="p-5 rounded-xl glass-surface">
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <h2 className="text-2xl font-bold mb-4">How Dutch Works — In 60 Seconds</h2>
      <ol className="space-y-2 mb-8">
        <li><strong>Deal 4 cards face-down</strong> to each player. Peek at 2 of your own.</li>
        <li><strong>On your turn</strong>, draw from the deck or discard pile. Swap with one of your cards or discard.</li>
        <li><strong>Use special cards</strong> — 7s swap with opponents, 9/10 let you peek, Jacks skip a player.</li>
        <li><strong>Call "Dutch"</strong> when you think you have the lowest score.</li>
        <li><strong>Reveal cards</strong> — lowest total wins the round. Wrong Dutch call = penalty!</li>
      </ol>

      <p>
        Want the full rules? Read our{' '}
        <Link to="/dutch-rules" className="text-primary hover:underline">complete Dutch rules guide</Link> or learn{' '}
        <Link to="/how-to-play-dutch" className="text-primary hover:underline">how to play Dutch step by step</Link>.
      </p>

      {/* Card Values */}
      <h2 className="text-2xl font-bold mb-4">Card Values at a Glance</h2>
      <div className="not-prose mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden glass-surface">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Card</th>
                <th className="px-4 py-3 font-semibold">Points</th>
                <th className="px-4 py-3 font-semibold">Special Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-4 py-3">Ace</td><td className="px-4 py-3">1</td><td className="px-4 py-3">—</td></tr>
              <tr><td className="px-4 py-3">2–6</td><td className="px-4 py-3">Face value</td><td className="px-4 py-3">—</td></tr>
              <tr><td className="px-4 py-3">7</td><td className="px-4 py-3">7</td><td className="px-4 py-3">Swap a card with an opponent</td></tr>
              <tr><td className="px-4 py-3">8</td><td className="px-4 py-3">8</td><td className="px-4 py-3">—</td></tr>
              <tr><td className="px-4 py-3">9–10</td><td className="px-4 py-3">9–10</td><td className="px-4 py-3">Peek at one of your hidden cards</td></tr>
              <tr><td className="px-4 py-3">Jack</td><td className="px-4 py-3">10</td><td className="px-4 py-3">Skip another player's turn</td></tr>
              <tr><td className="px-4 py-3">Queen</td><td className="px-4 py-3">10</td><td className="px-4 py-3">—</td></tr>
              <tr><td className="px-4 py-3">Red King</td><td className="px-4 py-3">10</td><td className="px-4 py-3">—</td></tr>
              <tr><td className="px-4 py-3 font-bold">Black King</td><td className="px-4 py-3 font-bold text-green-500">0</td><td className="px-4 py-3 font-bold">Best card in the game!</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <p>
        For a detailed breakdown, see our{' '}
        <Link to="/dutch-scoring" className="text-primary hover:underline">Dutch scoring guide</Link>.
      </p>

      {/* Why Use the App */}
      <h2 className="text-2xl font-bold mb-4">Why Use Dutch Card Game Companion?</h2>
      <ul className="space-y-2 mb-8">
        <li><strong>Instant score tracking</strong> — no pen and paper needed.</li>
        <li><strong>AI commentary</strong> — Professor Cartouche reacts to your plays in real time.</li>
        <li><strong>Statistics & history</strong> — track averages, streaks, and improvement over time.</li>
        <li><strong>Works offline</strong> — play anywhere, no internet required after first load.</li>
        <li><strong>Free & private</strong> — no account needed, data stays on your device.</li>
      </ul>

      {/* FAQ Section */}
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
