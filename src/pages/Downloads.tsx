import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Inbox } from 'lucide-react';
import { DownloadItem } from '../components/DownloadItem';
import { DownloadProgress } from '../components/DownloadProgress';
import { useAppContext } from '../context/AppContext';

export const Downloads: React.FC = () => {
  const { downloadItems, removeDownload } = useAppContext();
  
  const activeDownloads = downloadItems.filter(
    item => item.status === 'pending' || item.status === 'downloading'
  );
  
  const completedDownloads = downloadItems.filter(
    item => item.status === 'completed'
  );
  
  const failedDownloads = downloadItems.filter(
    item => item.status === 'failed'
  );
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="font-bold text-2xl text-white">Downloads</h1>
      </motion.div>
      
      {downloadItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-12 text-center flex flex-col items-center"
        >
          <Inbox size={48} className="text-gray-500 mb-4" />
          <h2 className="text-xl font-medium text-white mb-2">No downloads yet</h2>
          <p className="text-gray-400">
            Use the home page to search for videos and add them to your download queue
          </p>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {activeDownloads.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Download size={18} className="text-accent-500" />
                Active Downloads
              </h2>
              
              <AnimatePresence>
                {activeDownloads.map(item => (
                  <DownloadItem 
                    key={item.id} 
                    item={item} 
                    onRemove={removeDownload} 
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {completedDownloads.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Download size={18} className="text-success-500" />
                Completed Downloads ({completedDownloads.length})
              </h2>
              
              <AnimatePresence>
                {completedDownloads.map(item => (
                  <DownloadItem 
                    key={item.id} 
                    item={item} 
                    onRemove={removeDownload} 
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {failedDownloads.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Download size={18} className="text-error-500" />
                Failed Downloads ({failedDownloads.length})
              </h2>
              
              <AnimatePresence>
                {failedDownloads.map(item => (
                  <DownloadItem 
                    key={item.id} 
                    item={item} 
                    onRemove={removeDownload} 
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
      
      <DownloadProgress />
    </motion.div>
  );
};