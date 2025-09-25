import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAds } from '@/contexts/EnhancedAdContext';
import EnhancedAdSlot from '@/components/ads/EnhancedAdSlot';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const { shouldShowAds } = useAds();

  // Clone les enfants pour ajouter des ads entre eux
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="w-full mx-auto max-w-screen-xl px-4">
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          
          {/* Insérer une ad après la section features (index 1) et avant la dernière section */}
          {shouldShowAds && (index === 1 || (index === 2 && childrenArray.length > 3)) && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="py-8 my-8"
            >
              <div className="flex justify-center">
                <EnhancedAdSlot 
                  placement="homepage-inline" 
                  priority="high"
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </motion.section>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default HomeLayout;