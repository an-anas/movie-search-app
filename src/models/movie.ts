import { Genre, MovieResult } from "./search-movie-result";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    voteAverage: number;
    releaseDate: string;
    runtime: number;
    genres: Genre[];
    readonly releaseYear: string;
}

export const createMovie = (movie: MovieResult): Movie => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    voteAverage: movie.vote_average,
    releaseDate: movie.release_date,
    runtime: movie.runtime,
    genres: movie.genres,
    releaseYear: movie.release_date ? `(${movie.release_date.split('-')[0]})` : '',
});