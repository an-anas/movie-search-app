import { Genre, MovieResult } from "./search-movie-result";

export class Movie {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    voteAverage: number;
    releaseDate: string;
    runtime: number;
    genres: Genre[];

    constructor(movie: MovieResult) {
        this.id = movie.id;
        this.title = movie.title;
        this.overview = movie.overview;
        this.posterPath = movie.poster_path;
        this.backdropPath = movie.backdrop_path;
        this.voteAverage = movie.vote_average;
        this.releaseDate = movie.release_date;
        this.runtime = movie.runtime;
        this.genres = movie.genres;
    }

    get releaseYear() {
        return this.releaseDate
        ? `(${this.releaseDate.split('-')[0]})`
        : '';
    }
}