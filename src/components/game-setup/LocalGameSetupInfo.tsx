
import React from 'react';
import { Smartphone } from 'lucide-react';

const LocalGameSetupInfo: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-600 py-2 mb-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 px-4">
      <Smartphone className="w-4 h-4 text-dutch-blue" />
      <span className="text-sm font-medium">Un seul appareil</span>
    </div>
  );
};

export default LocalGameSetupInfo;
