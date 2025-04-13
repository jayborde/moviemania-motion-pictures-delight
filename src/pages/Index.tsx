
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  fetchTrending,
  fetchNetflixOriginals,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumentaries,
  MovieResponse
} from "@/services/movieApi";

const HomePage = () => {
  const [movies, setMovies] = useState<Record<string, MovieResponse>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        
        const [
          trending,
          originals,
          topRated,
          actionMovies,
          comedyMovies,
          horrorMovies,
          romanceMovies,
          documentaries
        ] = await Promise.all([
          fetchTrending(),
          fetchNetflixOriginals(),
          fetchTopRated(),
          fetchActionMovies(),
          fetchComedyMovies(),
          fetchHorrorMovies(),
          fetchRomanceMovies(),
          fetchDocumentaries()
        ]);

        setMovies({
          trending,
          originals,
          topRated,
          actionMovies,
          comedyMovies,
          horrorMovies,
          romanceMovies,
          documentaries
        });
      } catch (error) {
        console.error("Error fetching movie data:", error);
        toast({
          title: "Failed to load content",
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
      <HeroBanner />
      
      <div className="mt-0 md:-mt-16 relative z-20">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {movies.trending && (
              <MovieRow title="Trending Now" movies={movies.trending.results} />
            )}
            {movies.originals && (
              <MovieRow title="Moviemania Originals" movies={movies.originals.results} />
            )}
            {movies.topRated && (
              <MovieRow title="Top Rated" movies={movies.topRated.results} />
            )}
            {movies.actionMovies && (
              <MovieRow title="Action Movies" movies={movies.actionMovies.results} />
            )}
            {movies.comedyMovies && (
              <MovieRow title="Comedies" movies={movies.comedyMovies.results} />
            )}
            {movies.horrorMovies && (
              <MovieRow title="Horror Movies" movies={movies.horrorMovies.results} />
            )}
            {movies.romanceMovies && (
              <MovieRow title="Romance Movies" movies={movies.romanceMovies.results} />
            )}
            {movies.documentaries && (
              <MovieRow title="Documentaries" movies={movies.documentaries.results} />
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
