import React from 'react';
import { motion } from 'framer-motion';
import { Download, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface NavBarProps {
  currentPage: 'home' | 'downloads';
  setCurrentPage: (page: 'home' | 'downloads') => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentPage, setCurrentPage }) => {
  const { downloadItems } = useAppContext();
  
  const pendingOrDownloadingCount = downloadItems.filter(
    item => item.status === 'pending' || item.status === 'downloading'
  ).length;
  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="sticky bottom-0 left-0 right-0 z-20 pb-6 pt-2"
    >
      <div className="container mx-auto max-w-md">
        <div className="glass-panel mx-4 p-2 rounded-full border border-dark-600">
          <div className="flex justify-around">
            <NavButton
              icon={<Home size={20} />}
              label="Home"
              isActive={currentPage === 'home'}
              onClick={() => setCurrentPage('home')}
            />
            
            <NavButton
              icon={<Download size={20} />}
              label="Downloads"
              isActive={currentPage === 'downloads'}
              badgeCount={pendingOrDownloadingCount}
              onClick={() => setCurrentPage('downloads')}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badgeCount?: number;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  isActive,
  badgeCount,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center py-2 px-6 rounded-full transition-all ${
      isActive
        ? 'bg-dark-700 text-accent-500'
        : 'text-gray-400 hover:text-white'
    }`}
  >
    <div className="relative">
      {icon}
      
      {badgeCount && badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center 
                        w-4 h-4 text-[10px] font-semibold rounded-full 
                        bg-accent-500 text-dark-900">
          {badgeCount}
        </span>
      )}
    </div>
    
    <span className="text-xs mt-1">{label}</span>
  </button>
);