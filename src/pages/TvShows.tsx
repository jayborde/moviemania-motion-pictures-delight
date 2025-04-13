
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { fetchNetflixOriginals, MovieResponse } from "@/services/movieApi";
import { useToast } from "@/hooks/use-toast";

const TvShowsPage = () => {
  const [tvShows, setTvShows] = useState<MovieResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTvData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNetflixOriginals();
        setTvShows(data);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
        toast({
          title: "Failed to load TV shows",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTvData();
  }, [toast]);

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />
      
      <div className="pt-20 px-4 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">TV Shows</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          tvShows && <MovieRow title="Popular TV Shows" movies={tvShows.results} />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default TvShowsPage;
