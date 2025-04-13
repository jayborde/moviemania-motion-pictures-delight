
import { useState, useEffect } from "react";
import { fetchVideos, fetchDetails, VideoResult } from "../services/movieApi";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  id: string;
  mediaType: string;
  onClose: () => void;
}

const VideoPlayer = ({ id, mediaType, onClose }: VideoPlayerProps) => {
  const [video, setVideo] = useState<VideoResult | null>(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setIsLoading(true);
        // Get video search term and movie details
        const data = await fetchVideos(id, mediaType);
        const details = await fetchDetails(id, mediaType);
        
        setMovieTitle(details.title || details.name || "");
        
        if (data.results.length > 0) {
          setVideo(data.results[0]);
        }
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
              src={`https://www.youtube.com/embed?search=${video.key}&autoplay=1`}
              title={video.name}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video w-full bg-gray-900 flex items-center justify-center text-white">
            <p>No trailer available for "{movieTitle}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
