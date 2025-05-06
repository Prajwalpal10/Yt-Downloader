import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { fetchVideoInfo } from '../utils/videoUtils';

interface UrlInputProps {
  onVideoInfo: (info: any) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onVideoInfo }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const videoInfo = await fetchVideoInfo(url);
      onVideoInfo(videoInfo);
      setError(null);
    } catch (err) {
      setError('Invalid YouTube URL or video not found');
      onVideoInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [url, onVideoInfo]);
  
  const clearInput = () => {
    setUrl('');
    setError(null);
    onVideoInfo(null);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4 text-white">Enter YouTube URL</h2>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 pr-24 bg-dark-700/70 border border-dark-600 rounded-lg 
                      text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                      focus:ring-accent-500/50 transition-all duration-300"
          />
          
          {url && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-[84px] text-gray-400 hover:text-white p-2 transition-colors"
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          )}
          
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 bg-gradient-to-r from-secondary-500 to-accent-500 
                      text-white px-4 py-2 rounded-md font-medium flex items-center 
                      justify-center space-x-1 transition duration-300 hover:opacity-90 
                      disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Search size={16} />
                <span>Search</span>
              </>
            )}
          </motion.button>
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-error-500 mt-2 text-sm"
          >
            {error}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};