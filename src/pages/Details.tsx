
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Movie, fetchDetails, getBackdropUrl, getPosterUrl } from "@/services/movieApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Play, Plus, ThumbsUp, Share2 } from "lucide-react";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get("media_type") || "movie";
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchDetails(id, mediaType);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast({
          title: "Failed to load details",
          description: "Please try again later",
          variant: "destructive",
        });
        // Navigate back to home page on error
        setTimeout(() => navigate("/"), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, mediaType, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-dark flex flex-col items-center justify-center">
        <h1 className="text-2xl text-white mb-4">Content not found</h1>
        <Button onClick={() => navigate("/")} className="button-netflix">
          Back to Home
        </Button>
      </div>
    );
  }

  const title = movie.title || movie.name || "";
  const releaseDate = movie.release_date || movie.first_air_date || "";
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <div className="relative pt-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 h-[70vh] bg-cover bg-center" 
          style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}
        >
          <div className="hero-overlay"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 pt-[20vh] px-4 md:px-12">
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            {/* Poster */}
            <div className="flex-shrink-0 md:w-1/3">
              <img 
                src={getPosterUrl(movie.poster_path)} 
                alt={title} 
                className="w-full rounded-md shadow-2xl"
              />
            </div>
            
            {/* Details */}
            <div className="md:w-2/3 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
                {title} {year && <span className="text-gray-400">({year})</span>}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                {movie.vote_average > 0 && (
                  <div className="bg-netflix-red px-2 py-1 rounded text-sm font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </div>
                )}
                <span>{mediaType === "tv" ? "TV Series" : "Movie"}</span>
                <span>{releaseDate && new Date(releaseDate).toLocaleDateString()}</span>
              </div>
              
              <p className="text-lg mb-8 text-gray-300">{movie.overview}</p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Button className="bg-white text-black hover:bg-white/90" onClick={() => setShowPlayer(true)}>
                  <Play className="mr-2 h-4 w-4" /> Play Trailer
                </Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  <Plus className="mr-2 h-4 w-4" /> My List
                </Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  <ThumbsUp className="mr-2 h-4 w-4" /> Rate
                </Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showPlayer && (
        <VideoPlayer 
          id={id || ""} 
          mediaType={mediaType} 
          onClose={() => setShowPlayer(false)} 
        />
      )}
      
      <Footer />
    </div>
  );
};

export default DetailsPage;
