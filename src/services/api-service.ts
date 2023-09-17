import { SearchResult } from "@/models/search-movie-result";

const ApiService = {
    async getMovieById(id: string) {
        const baseUrl = `https://api.themoviedb.org/3/movie/${id}`;
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `${baseUrl}?api_key=${apiKey}&language=en-US`;

        const response = await fetch(url);
        return await response.json();
    },
    async getMoviesList(query: string, page: number): Promise<SearchResult> {
        const baseUrl = `https://api.themoviedb.org/3/search/movie`;
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `${baseUrl}?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`;

        const response = await fetch(url);
        return await response.json();
    }
};

export default ApiService;