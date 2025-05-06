import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UrlInput } from '../components/UrlInput';
import { VideoPreview } from '../components/VideoPreview';
import { DownloadProgress } from '../components/DownloadProgress';
import { useAppContext } from '../context/AppContext';
import { VideoInfo, VideoQuality } from '../types';

export const Home: React.FC = () => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const { addToDownloads } = useAppContext();
  
  const handleVideoInfo = (info: VideoInfo | null) => {
    setVideoInfo(info);
  };
  
  const handleDownload = (quality: VideoQuality) => {
    if (!videoInfo) return;
    
    addToDownloads(
      videoInfo.id,
      videoInfo.title,
      videoInfo.thumbnail,
      quality
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
          YouTube Downloader
        </h1>
        <p className="text-gray-400 mt-2">
          Enter a YouTube URL to download videos in your preferred quality
        </p>
      </motion.div>
      
      <UrlInput onVideoInfo={handleVideoInfo} />
      
      {videoInfo && (
        <VideoPreview 
          videoInfo={videoInfo} 
          onDownload={handleDownload} 
        />
      )}
      
      <DownloadProgress />
    </motion.div>
  );
};