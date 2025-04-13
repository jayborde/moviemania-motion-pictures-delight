
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Movie, searchMovies } from "@/services/movieApi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { useToast } from "@/hooks/use-toast";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const data = await searchMovies(query);
        setResults(data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
        toast({
          title: "Search failed",
          description: "Please try again",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query, toast]);

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <div className="pt-20 px-4 md:px-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {query ? `Search results for: ${query}` : "Search for movies and TV shows"}
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((movie) => (
                  <div key={movie.id} className="animate-fade-in" style={{ animationDelay: `${results.indexOf(movie) * 50}ms` }}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            ) : (
              query ? (
                <div className="text-center text-white py-16">
                  <p className="text-xl">No results found for "{query}"</p>
                  <p className="text-gray-400 mt-2">Try different keywords or check spelling</p>
                </div>
              ) : (
                <div className="text-center text-white py-16">
                  <p className="text-xl">Enter a search term to find movies and TV shows</p>
                </div>
              )
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
