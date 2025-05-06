
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { DownloadItem, VideoQuality } from '../types';
import { downloadVideo } from '../utils/videoUtils';

interface AppContextProps {
  downloadItems: DownloadItem[];
  isDownloading: boolean;
  currentDownload: DownloadItem | null;
  addToDownloads: (url: string, title: string, thumbnail: string, quality: VideoQuality) => void;
  removeDownload: (id: string) => void;
}

const AppContext = createContext<AppContextProps>({
  downloadItems: [],
  isDownloading: false,
  currentDownload: null,
  addToDownloads: () => {},
  removeDownload: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [downloadItems, setDownloadItems] = useState<DownloadItem[]>(() => {
    const savedItems = localStorage.getItem('downloadItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [currentDownload, setCurrentDownload] = useState<DownloadItem | null>(null);

  useEffect(() => {
    localStorage.setItem('downloadItems', JSON.stringify(downloadItems));
  }, [downloadItems]);

  useEffect(() => {
    if (isDownloading || !downloadItems.length) return;

    const pendingDownload = downloadItems.find(item => item.status === 'pending');
    if (!pendingDownload) return;

    const processDownload = async () => {
      setIsDownloading(true);
      setCurrentDownload(pendingDownload);

      setDownloadItems(items =>
        items.map(item =>
          item.id === pendingDownload.id
            ? { ...item, status: 'downloading', progress: 0 }
            : item
        )
      );

      try {
        const blob = await downloadVideo(pendingDownload.url, pendingDownload.quality, (progress) => {
          setDownloadItems(items =>
            items.map(item =>
              item.id === pendingDownload.id ? { ...item, progress } : item
            )
          );
          setCurrentDownload(current => current && current.id === pendingDownload.id ? { ...current, progress } : current);
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${pendingDownload.title}.${pendingDownload.quality === 'audio' ? 'mp3' : 'mp4'}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloadItems(items =>
          items.map(item =>
            item.id === pendingDownload.id
              ? { ...item, status: 'completed', progress: 100, completedAt: new Date().toISOString() }
              : item
          )
        );
      } catch (error) {
        console.error('Download error:', error);
        setDownloadItems(items =>
          items.map(item =>
            item.id === pendingDownload.id ? { ...item, status: 'failed', progress: 0 } : item
          )
        );
      } finally {
        setIsDownloading(false);
        setCurrentDownload(null);
      }
    };

    processDownload();
  }, [downloadItems, isDownloading]);

  const addToDownloads = useCallback((url: string, title: string, thumbnail: string, quality: VideoQuality) => {
    const newDownload: DownloadItem = {
      id: Date.now().toString(),
      url,
      title,
      thumbnail,
      quality,
      status: 'pending',
      progress: 0,
      addedAt: new Date().toISOString(),
      completedAt: null
    };
    setDownloadItems(prev => [...prev, newDownload]);
  }, []);

  const removeDownload = useCallback((id: string) => {
    setDownloadItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{ downloadItems, isDownloading, currentDownload, addToDownloads, removeDownload }}>
      {children}
    </AppContext.Provider>
  );
};