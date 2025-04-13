
import { useState, useEffect } from "react";
import { Movie, fetchNetflixOriginals, getBackdropUrl } from "../services/movieApi";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const data = await fetchNetflixOriginals();
        // Select a random movie for the banner
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setMovie(data.results[randomIndex]);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerMovie();
  }, []);

  if (isLoading) {
    return <div className="h-[70vh] bg-netflix-black animate-pulse"></div>;
  }

  if (!movie) {
    return <div className="h-[70vh] bg-netflix-black flex items-center justify-center">Failed to load banner</div>;
  }

  return (
    <div className="relative h-[80vh] w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}
      >
        <div className="hero-overlay"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-16 z-20 w-full md:w-2/3 space-y-4 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {movie.title || movie.name}
          </h1>
          <p className="text-white/80 text-sm md:text-base line-clamp-3 md:line-clamp-4">
            {movie.overview}
          </p>
          <div className="flex space-x-3">
            <Link to={`/watch/${movie.id}?media_type=${movie.media_type || 'tv'}`}>
              <Button className="bg-white text-black hover:bg-white/90">
                <Play className="mr-2 h-4 w-4" /> Play
              </Button>
            </Link>
            <Link to={`/details/${movie.id}?media_type=${movie.media_type || 'tv'}`}>
              <Button variant="outline" className="bg-gray-500/40 text-white border-none hover:bg-gray-500/60">
                <Info className="mr-2 h-4 w-4" /> More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
