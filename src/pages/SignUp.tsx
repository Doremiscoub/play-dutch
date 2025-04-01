
import React from 'react';
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const SignUp: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground variant="default" />
      </div>
      
      {/* Quadrillage léger */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 24 0 M 0 0 L 0 24' stroke='%23DADADA' stroke-opacity='0.1' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
      />
      
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
        
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/40 p-1 overflow-hidden">
          <ClerkSignUp 
            appearance={{
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
                formFieldAction__clipboard: "hidden",
                form: "w-full max-w-full overflow-hidden",
                formFieldRow: "max-w-full",
                formFieldInput__emailAddress: "w-full max-w-full",
                identityPreviewEditButton: "text-dutch-blue",
                otpCodeFieldInputs: "max-w-full",
                otpCodeField: "max-w-full overflow-hidden",
              }
            }}
            signInUrl="/sign-in"
            afterSignUpUrl="/game"
            redirectUrl="/game"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
