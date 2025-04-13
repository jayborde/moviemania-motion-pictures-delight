
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { fetchTopRated, fetchActionMovies, fetchComedyMovies, MovieResponse } from "@/services/movieApi";
import { useToast } from "@/hooks/use-toast";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Record<string, MovieResponse>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        
        const [topRated, actionMovies, comedyMovies] = await Promise.all([
          fetchTopRated(),
          fetchActionMovies(),
          fetchComedyMovies()
        ]);

        setMovies({
          topRated,
          actionMovies,
          comedyMovies
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast({
          title: "Failed to load movies",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [toast]);

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <div className="pt-20 px-4 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Movies</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {movies.topRated && (
              <MovieRow title="Top Rated" movies={movies.topRated.results} />
            )}
            {movies.actionMovies && (
              <MovieRow title="Action" movies={movies.actionMovies.results} />
            )}
            {movies.comedyMovies && (
              <MovieRow title="Comedy" movies={movies.comedyMovies.results} />
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MoviesPage;
