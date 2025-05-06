import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { VideoInfo, VideoQuality } from '../types';

interface VideoPreviewProps {
  videoInfo: VideoInfo;
  onDownload: (quality: VideoQuality) => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ videoInfo, onDownload }) => {
  const [showQualityOptions, setShowQualityOptions] = React.useState(false);
  const [selectedQuality, setSelectedQuality] = React.useState<VideoQuality>('480p');
  
  const qualities: VideoQuality[] = ['4K', '1080p', '720p', '480p', 'audio'];
  
  const toggleQualityOptions = () => {
    setShowQualityOptions(!showQualityOptions);
  };
  
  const selectQuality = (quality: VideoQuality) => {
    setSelectedQuality(quality);
    setShowQualityOptions(false);
  };
  
  const handleDownload = () => {
    onDownload(selectedQuality);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      className="glass-panel neon-border overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-16 overflow-y-auto  ">
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-2/5 rounded-lg overflow-hidden">
            <img 
              src={videoInfo.thumbnail} 
              alt={videoInfo.title} 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          
          <div className="w-full sm:w-3/5 space-y-4">
            <motion.h2 
              variants={itemVariants}
              className="text-xl font-semibold text-white line-clamp-2"
            >
              {videoInfo.title}
            </motion.h2>
            
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-gray-300 text-sm">
                <span className="text-gray-400">Channel:</span> {videoInfo.channelName}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-gray-400">Views:</span> {videoInfo.viewCount}
              </p>
              <p className="text-gray-300 text-sm">
                <span className="text-gray-400">Duration:</span> {videoInfo.duration}
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleQualityOptions}
                  className="glass-button w-full sm:w-auto"
                >
                  <span>Quality: {selectedQuality}</span>
                  {showQualityOptions ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
                </button>
                
               
      {showQualityOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 mt-2 w-full bg-dark-700 border border-dark-600 rounded-lg shadow-xl overflow-y-auto max-h-36" // max-h set for ~3 items
            >
              <ul>
                {qualities.map((quality) => (
                  <li key={quality}>
                    <button
                      type="button"
                      onClick={() => selectQuality(quality)}
                      className={`w-full text-left px-4 py-2 hover:bg-dark-600 transition-colors ${
                        selectedQuality === quality ? 'bg-dark-600 text-accent-500' : 'text-white'
                      }`}
                    >
                      {quality}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div> 
)}

              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                className="bg-gradient-to-r from-secondary-500 to-accent-500 px-6 py-2 
                          rounded-lg font-medium text-white flex items-center justify-center 
                          space-x-2 shadow-lg hover:shadow-accent-500/20 transition-all duration-300"
              >
                <Download size={18} />
                <span>Download</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};