export interface VideoInfo {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    channelName: string;
    viewCount: string;
  }
  
  export type VideoQuality = string; // e.g., 'best', 'bestvideo[height<=720]+bestaudio'
  