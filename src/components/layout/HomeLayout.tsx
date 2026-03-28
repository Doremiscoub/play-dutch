import React, { ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="w-full mx-auto max-w-screen-xl px-4">
      {children}
    </div>
  );
};

export default HomeLayout;
