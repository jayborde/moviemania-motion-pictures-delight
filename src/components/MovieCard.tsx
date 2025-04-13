
import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie, getPosterUrl } from "../services/movieApi";
import { Play, Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard = ({ movie, index }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const mediaType = movie.media_type || (movie.first_air_date ? "tv" : "movie");
  const title = movie.title || movie.name || "";
  const releaseDate = movie.release_date || movie.first_air_date || "";
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
  
  const animationDelay = index !== undefined ? `${index * 100}ms` : "0ms";

  return (
    <div
      className="movie-card relative min-w-[200px] h-[300px] md:min-w-[240px] md:h-[360px] m-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay }}
    >
      <Link to={`/details/${movie.id}?media_type=${mediaType}`}>
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={title}
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
        
        {isHovered && (
          <div className="movie-card-info absolute inset-0 bg-black/70 p-4 flex flex-col justify-between transition-opacity duration-300">
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-semibold truncate">{title}</h3>
              {year && <p className="text-gray-300 text-sm">{year}</p>}
              {movie.vote_average > 0 && (
                <p className="text-green-500 text-sm">
                  {movie.vote_average.toFixed(1)} Rating
                </p>
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="text-gray-300 text-xs line-clamp-4 mt-2">
                {movie.overview || "No description available."}
              </p>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="bg-white text-black hover:bg-white/90 flex-1">
                <Play className="h-3 w-3 mr-1" /> Play
              </Button>
              <Button size="sm" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 p-0 h-8 w-8 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 p-0 h-8 w-8 rounded-full">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default MovieCard;
