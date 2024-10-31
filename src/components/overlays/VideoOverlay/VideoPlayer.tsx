import React, { useRef, useState } from 'react';
import VideoControls from './VideoControls';

interface VideoPlayerProps {
  videoLink: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoLink }) => {
  const baseUrl = "assets/videos";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const isYouTubeLink = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : '';
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const seekVideo = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newTime = (offsetX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="relative w-auto h-full aspect-w-16 aspect-h-9 max-w-full max-h-full bg-gray-800 rounded-lg overflow-hidden">
      {isYouTubeLink(videoLink) ? (
        <iframe
          className="w-full h-full"
          src={getYouTubeEmbedUrl(videoLink)}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 0 }}
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          controls={false}
          className="object-contain w-full h-full pb-2"
          onClick={togglePlayPause}
          onTimeUpdate={updateProgress}
        >
          <source src={`${baseUrl}/${encodeURIComponent(videoLink)}`} type="video/mp4" />
        </video>
      )}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-600 cursor-pointer" onClick={seekVideo}>
        <div className="h-full bg-red-500" style={{ width: `${progress}%` }}></div>
      </div>
      <VideoControls isPlaying={isPlaying} togglePlayPause={togglePlayPause} resetVideo={resetVideo} />
    </div>
  );
};

export default VideoPlayer;
