
import { toast } from "sonner";

// Using OMDb API (The Open Movie Database)
const API_KEY = "f1f10c16"; // Free OMDb API key for demo purposes
const BASE_URL = "https://www.omdbapi.com";
const PLACEHOLDER_IMAGE = "/placeholder.svg";

export interface Movie {
  id: string;
  title: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type?: string;
  imdbID?: string;
  Year?: string;
  Type?: string;
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface VideoResult {
  key: string;
  site: string;
  type: string;
  name: string;
}

export interface VideosResponse {
  results: VideoResult[];
}

const fetchWithErrorHandling = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    toast.error("Error fetching data");
    console.error("API error:", error);
    throw error;
  }
};

// Helper function to transform OMDb item to our Movie interface format
const transformOmdbToMovie = (item: any, mediaType = "movie"): Movie => {
  return {
    id: item.imdbID,
    title: item.Title || "",
    name: item.Title || "",
    poster_path: item.Poster && item.Poster !== "N/A" ? item.Poster : "",
    backdrop_path: item.Poster && item.Poster !== "N/A" ? item.Poster : "",
    overview: item.Plot || "",
    release_date: item.Year || "",
    first_air_date: item.Year || "",
    vote_average: parseFloat(item.imdbRating || "0") || 0,
    media_type: mediaType,
    imdbID: item.imdbID,
    Year: item.Year,
    Type: item.Type
  };
};

// Fetch trending movies and TV shows
export const fetchTrending = async (): Promise<MovieResponse> => {
  // For trending, we'll search for popular terms
  const movies = await Promise.all([
    fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=marvel&type=movie&page=1`),
    fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=star&type=movie&page=1`)
  ]);
  
  const results = [...(movies[0].Search || []), ...(movies[1].Search || [])]
    .map(item => transformOmdbToMovie(item));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Fetch Netflix originals (TV shows)
export const fetchNetflixOriginals = async (): Promise<MovieResponse> => {
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=series&type=series&page=1`);
  
  const results = (data.Search || [])
    .map(item => transformOmdbToMovie(item, "tv"));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Fetch top rated movies
export const fetchTopRated = async (): Promise<MovieResponse> => {
  const queries = ["drama", "action", "comedy"];
  const index = Math.floor(Math.random() * queries.length);
  
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=${queries[index]}&type=movie&page=1`);
  
  const results = (data.Search || [])
    .map(item => transformOmdbToMovie(item));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Fetch action movies
export const fetchActionMovies = async (): Promise<MovieResponse> => {
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=action&type=movie&page=1`);
  
  const results = (data.Search || [])
    .map(item => transformOmdbToMovie(item));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Fetch comedy movies
export const fetchComedyMovies = async (): Promise<MovieResponse> => {
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=comedy&type=movie&page=1`);
  
  const results = (data.Search || [])
    .map(item => transformOmdbToMovie(item));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Fetch horror movies
export const fetchHorrorMovies = async (): Promise<MovieResponse> => {
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=horror&type=movie&page=1`);
  
  const results = (data.Search || [])
    .map(item => transformOmdbToMovie(item));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Fetch romance movies
export const fetchRomanceMovies = async (): Promise<MovieResponse> => {
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=romance&type=movie&page=1`);
  
  const results = (data.Search || [])
    .map(item => transformOmdbToMovie(item));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Fetch documentaries
export const fetchDocumentaries = async (): Promise<MovieResponse> => {
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=documentary&type=movie&page=1`);
  
  const results = (data.Search || [])
    .map(item => transformOmdbToMovie(item));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Fetch movie or TV show details
export const fetchDetails = async (id: string, mediaType: string): Promise<Movie> => {
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`);
  return transformOmdbToMovie(data, mediaType);
};

// Fetch videos for a movie or TV show - OMDb doesn't provide trailer links
// We'll create some mock data for demonstration
export const fetchVideos = async (id: string, mediaType: string): Promise<VideosResponse> => {
  // Since OMDb doesn't provide video links, we'll use YouTube search API parameters
  // to create a URL that would generally find a trailer for the movie/show
  const details = await fetchDetails(id, mediaType);
  const title = details.title || details.name || "";
  
  return {
    results: [
      {
        key: `${title.replace(/\s+/g, '+')}+trailer`, // This will be used to construct a YouTube search
        site: "YouTube",
        type: "Trailer",
        name: `${title} Official Trailer`
      }
    ]
  };
};

// Search movies and TV shows
export const searchMovies = async (query: string): Promise<MovieResponse> => {
  const data = await fetchWithErrorHandling(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=1`);
  
  const results = (data.Search || [])
    .map(item => transformOmdbToMovie(item, item.Type === "series" ? "tv" : "movie"));
  
  return {
    results,
    page: 1,
    total_pages: 1,
    total_results: results.length
  };
};

// Get poster image URL
export const getPosterUrl = (path: string, size = "w500"): string => {
  return path ? path : PLACEHOLDER_IMAGE;
};

// Get backdrop image URL
export const getBackdropUrl = (path: string, size = "original"): string => {
  return path ? path : PLACEHOLDER_IMAGE;
};
