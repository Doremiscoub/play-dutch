
import React from 'react';
import { motion } from 'framer-motion';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const SignIn: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-200/60 z-0" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-[15%] w-36 h-36 rounded-full bg-dutch-blue/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <Link to="/" className="absolute top-6 left-6 z-10 flex items-center text-gray-700 hover:text-dutch-blue transition-colors">
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span>Retour</span>
      </Link>
      
      <div className="relative z-10 mb-8 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent mb-2">
            Connectez-vous
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
        <p className="text-gray-600 text-lg">Accédez à votre compte Dutch</p>
      </div>
      
      <div className="w-full max-w-md">
        <ClerkSignIn 
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl="/game"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
              card: 'backdrop-blur-md bg-white/80 shadow-xl border border-gray-100',
              headerTitle: 'text-dutch-blue text-xl',
              footerAction: 'text-dutch-purple hover:text-dutch-blue',
            }
          }}
        />
      </div>
    </motion.div>
  );
};

export default SignIn;
