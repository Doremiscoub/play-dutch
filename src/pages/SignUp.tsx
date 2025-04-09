
import React from 'react';
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const SignUp: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground variant="default" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Link to="/" className="inline-block mb-8">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
        
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/40 p-1">
          <ClerkSignUp 
            appearance={{
              variables: {
                colorPrimary: "#0A84FF",
                colorTextOnPrimaryBackground: "white",
                colorTextSecondary: "#4B5563",
                colorBackground: "transparent",
                fontFamily: "SF Pro Text, SF Pro Display, system-ui, sans-serif",
                borderRadius: "1rem"
              },
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-0 p-4",
                headerTitle: "text-2xl font-bold text-dutch-blue",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "bg-white hover:bg-gray-50 border border-gray-200",
                dividerLine: "bg-gray-200",
                formFieldLabel: "text-gray-700",
                formFieldInput: "bg-white border-gray-300 focus:border-dutch-blue focus:ring-dutch-blue/20",
                footerActionLink: "text-dutch-blue hover:text-dutch-blue-dark",
                formButtonPrimary: "bg-dutch-blue hover:bg-dutch-blue-dark focus:ring-dutch-blue/30",
              }
            }}
            redirectUrl="/game"
            routing="path"
            path="/sign-up"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
