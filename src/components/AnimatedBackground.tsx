import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'game' | 'vibrant' | 'minimal' | 'smooth';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  if (variant === 'smooth') {
    return (
      <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-64">
            <motion.path 
              initial={{ d: "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,106.7C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,106.7C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ]
              }}
              transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              fill="rgba(235, 210, 255, 0.3)"
            />
            <motion.path 
              initial={{ d: "M0,224L48,218.7C96,213,192,203,288,186.7C384,171,480,149,576,165.3C672,181,768,235,864,218.7C960,203,1056,117,1152,96C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,224L48,218.7C96,213,192,203,288,186.7C384,171,480,149,576,165.3C672,181,768,235,864,218.7C960,203,1056,117,1152,96C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,256L48,240C96,224,192,192,288,176C384,160,480,160,576,176C672,192,768,224,864,240C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
              fill="rgba(147, 197, 253, 0.3)"
            />
            <motion.path 
              initial={{ d: "M0,256L48,266.7C96,277,192,299,288,277.3C384,256,480,192,576,186.7C672,181,768,235,864,229.3C960,224,1056,160,1152,149.3C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,256L48,266.7C96,277,192,299,288,277.3C384,256,480,192,576,186.7C672,181,768,235,864,229.3C960,224,1056,160,1152,149.3C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,288L48,266.7C96,245,192,203,288,202.7C384,203,480,245,576,261.3C672,277,768,267,864,245.3C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ]
              }}
              transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
              fill="rgba(253, 186, 116, 0.2)"
            />
          </svg>
        </div>
        
        {/* Floating particles */}
        <motion.div 
          className="absolute w-4 h-4 rounded-full bg-dutch-blue/10"
          initial={{ x: '10%', y: '20%' }}
          animate={{ x: ['10%', '15%', '10%'], y: ['20%', '25%', '20%'] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute w-3 h-3 rounded-full bg-dutch-purple/10"
          initial={{ x: '80%', y: '50%' }}
          animate={{ x: ['80%', '85%', '80%'], y: ['50%', '45%', '50%'] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute w-2 h-2 rounded-full bg-dutch-orange/10"
          initial={{ x: '30%', y: '70%' }}
          animate={{ x: ['30%', '35%', '30%'], y: ['70%', '65%', '70%'] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute w-3 h-3 rounded-full bg-dutch-green/10"
          initial={{ x: '70%', y: '10%' }}
          animate={{ x: ['70%', '75%', '70%'], y: ['10%', '15%', '10%'] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute w-2 h-2 rounded-full bg-dutch-blue/10"
          initial={{ x: '40%', y: '30%' }}
          animate={{ x: ['40%', '35%', '40%'], y: ['30%', '35%', '30%'] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    );
  }

  const intensity = variant === 'subtle' ? 0.7 : 1;
  
  return (
    <>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-200/60 z-0" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-[0.03] z-0" />
      
      {/* Animated background elements */}
      <motion.div
        className={`absolute top-20 left-[15%] w-56 h-56 rounded-full bg-dutch-blue/${Math.round(10 * intensity)} blur-3xl z-0`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4 * intensity, 0.6 * intensity, 0.4 * intensity],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className={`absolute bottom-24 right-[10%] w-64 h-64 rounded-full bg-dutch-orange/${Math.round(10 * intensity)} blur-3xl z-0`}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3 * intensity, 0.5 * intensity, 0.3 * intensity],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className={`absolute -top-10 right-[20%] w-48 h-48 rounded-full bg-dutch-purple/${Math.round(10 * intensity)} blur-3xl z-0`}
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2 * intensity, 0.4 * intensity, 0.2 * intensity],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Decorative elements */}
      {variant === 'default' && (
        <>
          <motion.div 
            className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dutch-blue/20 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dutch-purple/20 to-transparent"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />
        </>
      )}
      
      {/* Floating elements */}
      <motion.div
        className="absolute bottom-[30%] left-12 w-4 h-4 rounded-full bg-dutch-blue/30 z-0"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-[25%] right-14 w-3 h-3 rounded-full bg-dutch-orange/40 z-0"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-[40%] left-20 w-2 h-2 rounded-full bg-dutch-purple/40 z-0"
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Additional floating elements */}
      <motion.div
        className="absolute top-[60%] right-28 w-3 h-3 rounded-full bg-dutch-pink/30 z-0"
        animate={{ 
          y: [0, -12, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-[20%] left-32 w-2 h-2 rounded-full bg-dutch-green/40 z-0"
        animate={{ 
          y: [0, -9, 0],
          x: [0, -4, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Subtle wave effect at the bottom */}
      <svg className="absolute bottom-0 left-0 right-0 opacity-10 z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <motion.path 
          fill="#8B5CF6" 
          fillOpacity="1" 
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,181.3C96,203,192,245,288,229.3C384,213,480,139,576,128C672,117,768,171,864,186.7C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </svg>
      <svg className="absolute bottom-0 left-0 right-0 opacity-10 z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <motion.path 
          fill="#F97316" 
          fillOpacity="0.6" 
          d="M0,128L34.3,144C68.6,160,137,192,206,202.7C274.3,213,343,203,411,192C480,181,549,171,617,160C685.7,149,754,139,823,149.3C891.4,160,960,192,1029,208C1097.1,224,1166,224,1234,208C1302.9,192,1371,160,1406,144L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          animate={{
            d: [
              "M0,128L34.3,144C68.6,160,137,192,206,202.7C274.3,213,343,203,411,192C480,181,549,171,617,160C685.7,149,754,139,823,170.7C891.4,203,960,245,1029,261.3C1097.1,277,1166,267,1234,234.7C1302.9,203,1371,149,1406,122.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z",
              "M0,96L34.3,117.3C68.6,139,137,181,206,208C274.3,235,343,245,411,224C480,203,549,149,617,133.3C685.7,117,754,139,823,170.7C891.4,203,960,245,1029,261.3C1097.1,277,1166,267,1234,234.7C1302.9,203,1371,149,1406,122.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z",
              "M0,128L34.3,144C68.6,160,137,192,206,202.7C274.3,213,343,203,411,192C480,181,549,171,617,160C685.7,149,754,139,823,149.3C891.4,160,960,192,1029,208C1097.1,224,1166,224,1234,208C1302.9,192,1371,160,1406,144L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>
    </>
  );
};

export default AnimatedBackground;
