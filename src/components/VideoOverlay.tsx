import React from 'react';

interface VideoOverlayProps {
  videoLink: string;
  onClose: () => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ videoLink, onClose }) => {
  const baseUrl = "assets/videos";
  const isYouTubeLink = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : '';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative w-screen lg:w-fit max-w-5xl px-24 lg:p-4 bg-gray-800 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:-top-20 lg:-right-20 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center animate-pulse"
        >
          X
        </button>
        {isYouTubeLink(videoLink) ? (
          <iframe
            className="relative w-[1000px] h-96 max-w-3xl p-4 bg-gray-800 rounded-lg"
            src={getYouTubeEmbedUrl(videoLink)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video controls className="relative w-full max-w-3xl p-4 bg-gray-800 rounded-lg">
            <source src={`${baseUrl}/${encodeURIComponent(videoLink)}`} type="video/mp4" />
            <source src={`${baseUrl}/${encodeURIComponent(videoLink.replace('.mp4', '.webm'))}`} type="video/webm" />
            <source src={`${baseUrl}/${encodeURIComponent(videoLink.replace('.mp4', '.ogv'))}`} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoOverlay;
