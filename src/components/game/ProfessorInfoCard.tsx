
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Lightbulb, Star, Award, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfessorAvatar } from '@/features/ai-commentator';

interface ProfessorInfoCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfessorInfoCard: React.FC<ProfessorInfoCardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'skills' | 'achievements'>('bio');

  const professorData = {
    bio: {
      title: "Biographie",
      content: "Le Professeur Cartouche est un maître légendaire du jeu de cartes Dutch. Avec plus de 30 ans d'expérience, il a développé des stratégies uniques et peut prédire les mouvements des joueurs avec une précision troublante. Sa passion pour l'enseignement l'amène à commenter chaque partie avec humour et sagesse."
    },
    skills: {
      title: "Compétences",
      content: "Expert en analyse comportementale, stratégie de jeu avancée, et psychologie des cartes. Il maîtrise l'art du 'Dutch' parfait et peut détecter les patterns de jeu les plus subtils. Son expertise s'étend également à la motivation des joueurs et à l'animation de parties mémorables."
    },
    achievements: {
      title: "Accomplissements",
      content: "Champion du Dutch International 1995-2003, inventeur de 12 variantes du jeu, auteur de 'L'Art du Dutch Moderne', mentor de plus de 10 000 joueurs à travers le monde, et créateur du système de scoring révolutionnaire utilisé aujourd'hui."
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-2xl w-full bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-dutch-blue to-dutch-purple rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-dutch-orange to-dutch-purple rounded-full blur-3xl" />
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white/90 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Header avec Avatar */}
            <div className="p-8 pb-6 text-center relative z-10">
              <motion.div
                className="mb-6"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <ProfessorAvatar 
                  size="xxl"
                  animate={true}
                  mood="happy"
                  showParticles={true}
                  className="mx-auto"
                />
              </motion.div>
              
              <motion.h2
                className="text-4xl font-extrabold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Professeur Cartouche
              </motion.h2>
              
              <motion.p
                className="text-lg text-gray-600 font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Maître du Dutch & Commentateur IA
              </motion.p>
            </div>

            {/* Tabs */}
            <div className="px-8 mb-6">
              <div className="flex bg-white/50 backdrop-blur-sm rounded-2xl p-1.5 border border-white/60">
                {(Object.keys(professorData) as Array<keyof typeof professorData>).map((tab, index) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {tab === 'bio' && <Info className="h-4 w-4" />}
                      {tab === 'skills' && <Brain className="h-4 w-4" />}
                      {tab === 'achievements' && <Award className="h-4 w-4" />}
                      {professorData[tab].title}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60"
                >
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {professorData[activeTab].content}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Stats */}
            <div className="px-8 pb-8">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Star, label: "Parties", value: "50,000+" },
                  { icon: Award, label: "Victoires", value: "85%" },
                  { icon: Lightbulb, label: "Conseils", value: "∞" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-xl border border-white/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <stat.icon className="h-6 w-6 text-dutch-blue mx-auto mb-2" />
                    <div className="font-bold text-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfessorInfoCard;
