import { Movie } from "./movie";

export interface SearchMovieResult {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}