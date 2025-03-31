
import React from 'react';
import { motion } from 'framer-motion';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const SignUp: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background elements */}
      <AnimatedBackground variant="subtle" />
      
      <Link to="/" className="absolute top-6 left-6 z-10 flex items-center text-gray-700 hover:text-dutch-blue transition-colors">
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span>Retour</span>
      </Link>
      
      <div className="relative z-10 mb-8 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent mb-2">
            Inscription
          </h1>
          <motion.div 
            className="absolute -right-4 -top-3"
            animate={{ 
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="w-5 h-5 text-dutch-orange" />
          </motion.div>
        </div>
        <p className="text-gray-600 text-lg">Rejoignez la communauté Dutch</p>
      </div>
      
      <motion.div 
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ClerkSignUp 
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/game"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
              card: 'backdrop-blur-md bg-white/90 shadow-xl border border-white/50 rounded-2xl',
              headerTitle: 'text-dutch-blue text-xl',
              footerAction: 'text-dutch-purple hover:text-dutch-blue',
              socialButtonsBlockButton: 'border-white/20 bg-white/80 hover:bg-white/90',
              socialButtonsBlockButtonText: 'text-gray-700',
              formFieldInput: 'bg-white/80 border-white/30',
              formFieldInputShowPasswordButton: 'text-gray-500',
              otpCodeFieldInput: 'bg-white/80 border-white/30',
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
