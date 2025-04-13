
import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import VideoPlayer from "@/components/VideoPlayer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const WatchPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get("media_type") || "movie";
  
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Simulate entering fullscreen video mode
    const enterFullscreen = () => {
      setIsFullscreen(true);
      document.body.style.overflow = "hidden";
    };
    
    // Set fullscreen with a small delay for animation effect
    const timer = setTimeout(enterFullscreen, 500);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <div className={`transition-all duration-500 ${isFullscreen ? 'opacity-0' : 'opacity-100'} fixed top-4 left-4 z-50`}>
        <Link to={`/details/${id}?media_type=${mediaType}`}>
          <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>
      
      <div className="h-screen flex items-center justify-center">
        {id && <VideoPlayer id={id} mediaType={mediaType} onClose={() => {}} />}
      </div>
    </div>
  );
};

export default WatchPage;
