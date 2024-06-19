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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
      <div className="relative w-full h-full max-w-5xl max-h-full flex items-center justify-center p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center z-30"
        >
          X
        </button>
        {isYouTubeLink(videoLink) ? (
          <div className="w-full h-auto aspect-w-16 aspect-h-9 max-w-full max-h-full bg-gray-800 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(videoLink)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            ></iframe>
          </div>
        ) : (
          <div className="w-full h-auto aspect-w-16 aspect-h-9 max-w-full max-h-full bg-gray-800 rounded-lg overflow-hidden">
            <video controls className="w-full h-full">
              <source src={`${baseUrl}/${encodeURIComponent(videoLink)}`} type="video/mp4" />
              <source src={`${baseUrl}/${encodeURIComponent(videoLink.replace('.mp4', '.webm'))}`} type="video/webm" />
              <source src={`${baseUrl}/${encodeURIComponent(videoLink.replace('.mp4', '.ogv'))}`} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoOverlay;
