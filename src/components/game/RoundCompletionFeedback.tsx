import React, { useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface RoundCompletionFeedbackProps {
  roundNumber: number;
  playerScores: { name: string; score: number; totalScore: number; isDutch: boolean }[];
  previousLeader?: string;
  currentLeader?: string;
  isVisible: boolean;
  onDismiss: () => void;
}

// ── Tiny particle burst (non-canvas, inline) ──────────────────────────
const PARTICLE_COUNT = 14;
const COLORS = ['#0A84FF', '#8B5CF6', '#FF9F0A', '#34D399', '#F472B6'];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const Particles: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: randomBetween(-120, 120),
        y: randomBetween(-160, -40),
        rotate: randomBetween(-180, 180),
        scale: randomBetween(0.4, 1),
        color: COLORS[i % COLORS.length],
        delay: randomBetween(0, 0.25),
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: p.scale,
            opacity: 0,
            rotate: p.rotate,
          }}
          transition={{
            duration: 0.9,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────
const RoundCompletionFeedback: React.FC<RoundCompletionFeedbackProps> = ({
  roundNumber,
  playerScores,
  previousLeader,
  currentLeader,
  isVisible,
  onDismiss,
}) => {
  // Derived state
  const dutchPlayer = useMemo(
    () => playerScores.find((p) => p.isDutch),
    [playerScores],
  );

  const lowestScore = useMemo(() => {
    if (playerScores.length === 0) return null;
    return [...playerScores].sort((a, b) => a.score - b.score)[0];
  }, [playerScores]);

  const highestScore = useMemo(() => {
    if (playerScores.length === 0) return null;
    return [...playerScores].sort((a, b) => b.score - a.score)[0];
  }, [playerScores]);

  const hasLeadChange =
    previousLeader != null &&
    currentLeader != null &&
    previousLeader !== currentLeader;

  const isDutchRound = dutchPlayer != null;

  // ── Canvas-confetti burst for Dutch rounds ──────────────────────────
  useEffect(() => {
    if (!isVisible || !isDutchRound) return;

    const colors = ['#0A84FF', '#8B5CF6', '#FF9F0A'];
    const end = Date.now() + 1200;

    function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors,
        disableForReducedMotion: true,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }, [isVisible, isDutchRound]);

  // ── Auto-dismiss ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onDismiss, 3200);
    return () => clearTimeout(timer);
  }, [isVisible, onDismiss]);

  // ── Pick a headline & accent ────────────────────────────────────────
  const headline = useMemo(() => {
    if (hasLeadChange) return '👑 New Leader!';
    if (isDutchRound) return '🎯 Dutch!';
    return `✅ Round ${roundNumber}`;
  }, [hasLeadChange, isDutchRound, roundNumber]);

  const accentClass = hasLeadChange
    ? 'from-dutch-orange to-dutch-purple'
    : isDutchRound
      ? 'from-dutch-blue to-dutch-purple'
      : 'from-dutch-blue to-dutch-blue';

  // ── Tap-through dismiss ─────────────────────────────────────────────
  const handlePointerDown = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none pt-16 sm:pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Clickable backdrop — transparent, lets taps dismiss */}
          <div
            className="absolute inset-0 pointer-events-auto"
            onPointerDown={handlePointerDown}
          />

          {/* Card */}
          <motion.div
            className="relative pointer-events-auto glass-float rounded-2xl shadow-2xl max-w-sm w-[90%] overflow-hidden"
            initial={{ scale: 0.7, y: -40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: -60, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 22,
            }}
          >
            {/* Gradient accent bar */}
            <div
              className={`h-1 w-full bg-gradient-to-r ${accentClass}`}
            />

            {/* Particles layer (Dutch / lead-change only) */}
            {(isDutchRound || hasLeadChange) && <Particles />}

            <div className="px-5 py-4">
              {/* ── Headline ─────────────────────────────────────────── */}
              <motion.h2
                className="font-display font-black text-2xl text-center mb-1 tracking-tight text-foreground"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {headline}
              </motion.h2>

              {/* Sub-headline for lead change */}
              {hasLeadChange && (
                <motion.p
                  className="text-center text-sm font-bold text-dutch-orange mb-2"
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentLeader} takes the lead from {previousLeader}!
                </motion.p>
              )}

              {/* Sub-headline for Dutch winner */}
              {isDutchRound && dutchPlayer && !hasLeadChange && (
                <motion.p
                  className="text-center text-sm font-bold text-dutch-purple mb-2"
                  initial={{ y: 6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  🔥 {dutchPlayer.name} called Dutch with {dutchPlayer.score} pts
                </motion.p>
              )}

              {/* ── Stats row ────────────────────────────────────────── */}
              <motion.div
                className="mt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {/* Round number (always) */}
                <span className="flex items-center gap-1">
                  <span className="font-display font-bold text-foreground text-sm">
                    R{roundNumber}
                  </span>
                </span>

                {/* Best score this round */}
                {lowestScore && (
                  <>
                    <span className="text-border">|</span>
                    <span>
                      ⬇️{' '}
                      <span className="font-bold text-dutch-blue">
                        {lowestScore.name}
                      </span>{' '}
                      +{lowestScore.score}
                    </span>
                  </>
                )}

                {/* Worst score this round */}
                {highestScore && highestScore.name !== lowestScore?.name && (
                  <>
                    <span className="text-border">|</span>
                    <span>
                      ⬆️{' '}
                      <span className="font-bold text-dutch-orange">
                        {highestScore.name}
                      </span>{' '}
                      +{highestScore.score}
                    </span>
                  </>
                )}
              </motion.div>

              {/* ── Current standings (compact) ──────────────────────── */}
              <motion.div
                className="mt-3 flex flex-wrap justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                {[...playerScores]
                  .sort((a, b) => a.totalScore - b.totalScore)
                  .map((p, i) => (
                    <span
                      key={p.name}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        i === 0
                          ? 'bg-dutch-purple/15 text-dutch-purple'
                          : 'bg-muted/60 text-muted-foreground'
                      }`}
                    >
                      {i === 0 && '👑 '}
                      {p.name}{' '}
                      <span className="font-black">{p.totalScore}</span>
                    </span>
                  ))}
              </motion.div>
            </div>

            {/* Swoosh shine animation */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
            >
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoundCompletionFeedback;
