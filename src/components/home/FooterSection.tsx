import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, ExternalLink, BookOpen, Trophy, Settings, Info } from 'lucide-react';

const FooterSection: React.FC = () => {
  const navigate = useNavigate();

  const footerLinks = [
    {
      category: "Jeu",
      links: [
        { name: "Jouer maintenant", path: "/setup", icon: <Trophy className="h-4 w-4" /> },
        { name: "Règles du jeu", path: "/rules", icon: <BookOpen className="h-4 w-4" /> },
        { name: "Historique", path: "/history", icon: <Trophy className="h-4 w-4" /> }
      ]
    },
    {
      category: "Application", 
      links: [
        { name: "À propos", path: "/about", icon: <Info className="h-4 w-4" /> },
        { name: "FAQ", path: "/faq", icon: <BookOpen className="h-4 w-4" /> },
        { name: "Paramètres", path: "/settings", icon: <Settings className="h-4 w-4" /> }
      ]
    },
    {
      category: "Légal",
      links: [
        { name: "Conditions d'utilisation", path: "/terms", icon: <ExternalLink className="h-4 w-4" /> },
        { name: "Politique de confidentialité", path: "/privacy", icon: <ExternalLink className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-foreground/95 via-foreground/85 to-foreground text-white pt-20 pb-8">
      {/* Dégradé décoratif en haut */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-trinity-blue-500 via-trinity-purple-500 to-trinity-orange-500"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête du footer avec logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.img 
              src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
              alt="Dutch Card Game - Professeur Cartouche"
              className="h-24 w-auto object-contain"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <h2 className="text-3xl font-black text-gradient-trinity mb-4 leading-tight py-2">
            Dutch Card Game
          </h2>
          <p className="text-muted-foreground/50 font-semibold max-w-2xl mx-auto">
            Votre compagnon de jeu intelligent pour des soirées cartes inoubliables avec le Professeur Cartouche !
          </p>
        </motion.div>

        {/* Liens organisés par catégorie */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {footerLinks.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-black text-white mb-6 border-b border-muted-foreground/30 pb-2">
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => navigate(link.path)}
                      className="flex items-center gap-3 text-muted-foreground/50 hover:text-white font-semibold transition-colors duration-200 group"
                    >
                      <span className="text-trinity-blue-400 group-hover:text-trinity-purple-400 transition-colors duration-200">
                        {link.icon}
                      </span>
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Statistiques de l'app */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-dark rounded-2xl p-8 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Parties jouées", value: "2,500+", icon: "🎮" },
              { label: "Joueurs actifs", value: "1,200+", icon: "👥" },
              { label: "Commentaires IA", value: "15,000+", icon: "🤖" },
              { label: "Heures de fun", value: "∞", icon: "⏰" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="text-2xl">{stat.icon}</div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-muted-foreground/70 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Informations légales et copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-muted-foreground/30 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground/70 font-semibold text-center md:text-left">
              <p>© 2024 Dutch Card Game. Tous droits réservés.</p>
              <p className="text-sm mt-1">
                Développé avec <Heart className="inline h-4 w-4 text-red-400 mx-1" /> pour les amateurs de jeux de cartes
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.a
                href="mailto:contact@dutchcardgame.com"
                className="flex items-center gap-2 text-muted-foreground/70 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
                <span className="font-semibold">Contact</span>
              </motion.a>
            </div>
          </div>
          
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>🎯 Application web gratuite et hors-ligne - Aucune donnée personnelle collectée</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;