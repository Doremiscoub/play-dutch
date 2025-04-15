
import React from 'react';

const GradientAnimationStyles: React.FC = () => {
  return (
    <style>
      {`
        @keyframes gradient-x {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
        
        @keyframes gradient-radial {
          0% { background-size: 100% 100%; }
          50% { background-size: 120% 120%; }
          100% { background-size: 100% 100%; }
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 5px 0px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.6); }
          100% { box-shadow: 0 0 5px 0px rgba(139, 92, 246, 0.3); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        @keyframes wave-animation-1 {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-2%) translateY(1%); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes wave-animation-2 {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(2%) translateY(-1%); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #1EAEDB, #8B5CF6, #F97316, #1EAEDB);
          background-size: 300% 100%;
          animation: gradient-x 8s infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .pulse-card {
          animation: pulse-glow 3s infinite;
        }
        
        .float-element {
          animation: float 3s ease-in-out infinite;
        }
        
        .wave-bottom-1 {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 18vh;
          z-index: -2;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%23E9D5FF' d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,150.07,130.93,213.05,120.6,313.79,105.18,224.9,65.48,321.39,56.44Z'%3E%3C/path%3E%3C/svg%3E");
          background-size: cover;
          animation: wave-animation-1 15s ease-in-out infinite;
        }
        
        .wave-bottom-2 {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 15vh;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%23FDE68A' opacity='0.5' d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'%3E%3C/path%3E%3C/svg%3E");
          background-size: cover;
          animation: wave-animation-2 12s ease-in-out infinite;
        }
        
        .wave-bottom-3 {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 10vh;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%2360A5FA' opacity='0.2' d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'%3E%3C/path%3E%3C/svg%3E");
          background-size: cover;
          animation: wave-animation-1 10s ease-in-out infinite;
        }
        
        .background-dots {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -5;
          overflow: hidden;
          pointer-events: none;
        }
        
        .background-dot {
          position: absolute;
          border-radius: 50%;
          opacity: 0.2;
          animation: float 10s infinite ease-in-out;
        }
      `}
    </style>
  );
};

export default GradientAnimationStyles;
