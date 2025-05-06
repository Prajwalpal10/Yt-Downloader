import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export const DownloadProgress: React.FC = () => {
  const { currentDownload, isDownloading } = useAppContext();
  
  if (!isDownloading || !currentDownload) {
    return null;
  }
  
  return (
    <AnimatePresence>
      <motion.div
        key="download-progress"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed bottom-24 left-0 right-0 z-30 flex justify-center pointer-events-none"
      >
        <div className="glass-panel neon-border p-4 rounded-lg w-[90%] max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden">
              <img 
                src={currentDownload.thumbnail} 
                alt={currentDownload.title}
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-white truncate">
                {currentDownload.title}
              </h4>
              
              <div className="mt-1 relative pt-1">
                <div className="mb-1 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Downloading</span>
                    <span className="text-xs text-white ml-1 font-semibold">
                      {currentDownload.quality}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-accent-500">
                    {currentDownload.progress}%
                  </span>
                </div>
                
                <div className="w-full bg-dark-600 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentDownload.progress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-secondary-500 to-accent-500 relative overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeInOut'
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};