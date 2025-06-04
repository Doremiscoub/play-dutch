
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  name: string;
  comment: string;
  rating: number;
  avatar: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Marie L.",
    comment: "Parfait pour nos soirées jeux ! Plus besoin de papier et crayon.",
    rating: 5,
    avatar: "👩‍💼",
    location: "Paris"
  },
  {
    name: "Thomas K.",
    comment: "L'IA commentateur est hilarante, ça ajoute du fun à nos parties.",
    rating: 5,
    avatar: "👨‍💻",
    location: "Lyon"
  },
  {
    name: "Sophie M.",
    comment: "Interface très claire, même ma grand-mère arrive à s'en servir !",
    rating: 5,
    avatar: "👩‍🎓",
    location: "Marseille"
  },
  {
    name: "Antoine R.",
    comment: "Les statistiques de jeu sont géniales, on peut voir nos progrès !",
    rating: 5,
    avatar: "👨‍🎨",
    location: "Toulouse"
  },
  {
    name: "Camille D.",
    comment: "Application gratuite et sans pub, c'est rare de nos jours !",
    rating: 5,
    avatar: "👩‍🔬",
    location: "Nantes"
  }
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center gap-4 mb-6">
        <Button
          onClick={prevTestimonial}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          onClick={toggleAutoplay}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          onClick={nextTestimonial}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Card className="bg-white/70 backdrop-blur-xl border border-white/50 h-full shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-4xl mb-4"
                >
                  {testimonials[currentIndex].avatar}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex justify-center mb-4"
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-gray-700 mb-6 italic text-lg leading-relaxed"
                >
                  "{testimonials[currentIndex].comment}"
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <p className="font-semibold text-gray-800 text-lg">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[currentIndex].location}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-dutch-blue w-8' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
