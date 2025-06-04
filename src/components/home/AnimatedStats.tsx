
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Trophy, Clock, Heart } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: <Users className="h-8 w-8" />,
    value: 50000,
    suffix: "+",
    label: "Joueurs actifs",
    color: "text-dutch-blue"
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    value: 250000,
    suffix: "+",
    label: "Parties jouées",
    color: "text-dutch-purple"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    value: 99,
    suffix: "%",
    label: "Temps de fonctionnement",
    color: "text-dutch-orange"
  },
  {
    icon: <Heart className="h-8 w-8" />,
    value: 4.9,
    suffix: "/5",
    label: "Note moyenne",
    color: "text-red-500"
  }
];

interface AnimatedCounterProps {
  end: number;
  duration: number;
  suffix: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration, suffix }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  const formatNumber = (num: number) => {
    if (suffix === "/5") {
      return num.toFixed(1);
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "k";
    }
    return num.toString();
  };

  return (
    <div ref={counterRef} className="text-3xl font-bold">
      {formatNumber(count)}{suffix}
    </div>
  );
};

export const AnimatedStats: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Rejoignez notre communauté
        </h2>
        <p className="text-xl text-gray-600">
          Des milliers de joueurs nous font déjà confiance
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className={`${stat.color} mb-4 flex justify-center`}
                >
                  {stat.icon}
                </motion.div>
                
                <div className={`${stat.color} mb-2`}>
                  <AnimatedCounter
                    end={stat.value}
                    duration={2}
                    suffix={stat.suffix}
                  />
                </div>
                
                <p className="text-gray-600 font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
