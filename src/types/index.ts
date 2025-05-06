export type VideoQuality = '4K' | '1080p' | '720p' | '480p' | 'audio';

export type DownloadStatus = 'pending' | 'downloading' | 'completed' | 'failed';

export interface DownloadItem {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  quality: VideoQuality;
  status: DownloadStatus;
  progress: number;
  addedAt: string;
  completedAt: string | null;
}

export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channelName: string;
  viewCount: string;
}