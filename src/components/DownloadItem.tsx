import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { DownloadItem as DownloadItemType } from '../types';

interface DownloadItemProps {
  item: DownloadItemType;
  onRemove: (id: string) => void;
}

export const DownloadItem: React.FC<DownloadItemProps> = ({ item, onRemove }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getStatusIcon = () => {
    switch (item.status) {
      case 'completed':
        return <CheckCircle size={16} className="text-success-500" />;
      case 'failed':
        return <AlertTriangle size={16} className="text-error-500" />;
      case 'pending':
        return <Clock size={16} className="text-warning-500" />;
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-4 mb-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-24 h-16 rounded overflow-hidden">
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 bg-dark-600 rounded-full text-gray-300">
              {item.quality}
            </span>
            
            <div className="flex items-center gap-1">
              {getStatusIcon()}
              <span className="text-xs text-gray-400 capitalize">{item.status}</span>
            </div>
            
            <span className="text-xs text-gray-400">
              {item.status === 'completed' && item.completedAt 
                ? `Completed ${formatDate(item.completedAt)}` 
                : `Added ${formatDate(item.addedAt)}`}
            </span>
          </div>
          
          {item.status === 'downloading' && (
            <div className="mt-2 w-full bg-dark-600 rounded-full h-1.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-secondary-500 to-accent-500"
              />
            </div>
          )}
        </div>
        
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-400 hover:text-error-500 transition-colors"
          aria-label="Remove download"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};