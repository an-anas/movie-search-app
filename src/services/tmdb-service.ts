import { SearchMovieResult } from "@/models/search-movie-result";

export const TmdbService = {
    getMovieById(id: string) {
        const baseUrl = `https://api.themoviedb.org/3/movie/${id}`;
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `${baseUrl}?api_key=${apiKey}&language=en-US`;

        return fetch(url)
            .then(response => response.json())
    },
    searchMovies(query: string, page: number): Promise<SearchMovieResult> {
        const baseUrl = `https://api.themoviedb.org/3/search/movie`;
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `${baseUrl}?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`;

        return fetch(url)
            .then(response => response.json())
    }
};