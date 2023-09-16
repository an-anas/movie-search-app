export interface SearchMovieResult {
    page: number;
    results: MovieResult[];
    total_pages: number;
    total_results: number;
}

export interface MovieResult {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    genres: Genre[];

    readonly releaseYear: string;
}

export interface Genre {
    id: number;
    name: string;
}