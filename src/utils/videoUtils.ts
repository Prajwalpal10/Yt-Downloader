
import { VideoInfo, VideoQuality } from '../types';

const URL = import.meta.env.VITE_API_BASE_URL;

// Fetch video info from Flask server
export const fetchVideoInfo = async (url: string): Promise<VideoInfo> => {
  if (!url.includes('youtube.com/watch') && !url.includes('youtu.be/')) {
    throw new Error('Invalid YouTube URL');
  }

  const response = await fetch(`${URL}api/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to fetch video info');
  }

  const data = await response.json();

  return {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    duration: data.duration,
    channelName: data.channelName,
    viewCount: data.viewCount?.toString() || 'N/A',
  };
};

// ✅ NEW: Get available video qualities from Flask server
export const getAvailableQualities = async (url: string): Promise<VideoQuality[]> => {
  const response = await fetch(`${URL}api/formats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to fetch available formats');
  }

  const data = await response.json();
  return data.qualities; // ['360p', '720p', '1080p']
};



export async function downloadVideo(
  url: string,
  quality: string,
  onProgress: (progress: number) => void
): Promise<Blob> {
  const response = await fetch(`${URL}api/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, quality }),
  });

  if (!response.ok || !response.body) {
    throw new Error('Failed to start download');
  }

  const contentLength = response.headers.get('Content-Length');
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  const reader = response.body.getReader();
  const chunks = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      received += value.length;

      if (total) {
        const progress = Math.round((received / total) * 100);
        onProgress(progress);
      }
    }
  }

  return new Blob(chunks, { type: 'video/mp4' });
}

