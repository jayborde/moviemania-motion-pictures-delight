
import { toast } from "sonner";

// Using TMDB API
const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"; // This is a public API key for demo purposes
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type?: string;
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

// Fetch trending movies and TV shows
export const fetchTrending = async (): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`);
};

// Fetch Netflix originals (TV shows)
export const fetchNetflixOriginals = async (): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`);
};

// Fetch top rated movies
export const fetchTopRated = async (): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`);
};

// Fetch action movies
export const fetchActionMovies = async (): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);
};

// Fetch comedy movies
export const fetchComedyMovies = async (): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`);
};

// Fetch horror movies
export const fetchHorrorMovies = async (): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`);
};

// Fetch romance movies
export const fetchRomanceMovies = async (): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`);
};

// Fetch documentaries
export const fetchDocumentaries = async (): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`);
};

// Fetch movie or TV show details
export const fetchDetails = async (id: string, mediaType: string): Promise<Movie> => {
  return fetchWithErrorHandling(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=en-US`);
};

// Fetch videos for a movie or TV show
export const fetchVideos = async (id: string, mediaType: string): Promise<VideosResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=en-US`);
};

// Search movies and TV shows
export const searchMovies = async (query: string): Promise<MovieResponse> => {
  return fetchWithErrorHandling(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
};

// Get poster image URL
export const getPosterUrl = (path: string, size = "w500"): string => {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : "/placeholder.svg";
};

// Get backdrop image URL
export const getBackdropUrl = (path: string, size = "original"): string => {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : "/placeholder.svg";
};
