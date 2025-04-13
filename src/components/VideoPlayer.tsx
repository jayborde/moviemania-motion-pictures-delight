
import { useState, useEffect } from "react";
import { fetchVideos, VideoResult } from "../services/movieApi";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  id: string;
  mediaType: string;
  onClose: () => void;
}

const VideoPlayer = ({ id, mediaType, onClose }: VideoPlayerProps) => {
  const [video, setVideo] = useState<VideoResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVideos(id, mediaType);
        
        // Find a trailer, teaser or clip
        const trailer = data.results.find(v => 
          (v.type === "Trailer" || v.type === "Teaser" || v.type === "Clip") && 
          v.site === "YouTube"
        );
        
        setVideo(trailer || null);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [id, mediaType]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-5xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white hover:bg-white/10 z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        
        {video ? (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=0`}
              title={video.name}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video w-full bg-gray-900 flex items-center justify-center text-white">
            <p>No trailer available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
