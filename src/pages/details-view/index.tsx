import style from './style.module.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiService from '@/services/api-service';
import posterNaImagePath from '@/assets/poster_na.jpg';
import { Movie, createMovie } from '@/models/movie';

export const DetailsView = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        ApiService.getMovieById(id as string).then((movie) => setMovie(createMovie(movie)));
    }, [id]);

    if (!movie) {
        return (null);
    }

    const imagePath = movie.posterPath
        ? `https://image.tmdb.org/t/p/original${movie.posterPath}`
        : posterNaImagePath;

    return (
        <>
            <div className={style.header}>TMSE: The Movie Search Engine</div>
            <hr />
            <div className={style.details}>
                <div className={style.poster}>
                    <img
                        src={imagePath}
                        alt={movie.title}
                        width="200"
                        height="300"
                    />
                </div>
                <div className={style.title}>{movie.title}</div>
                <div className={style.releaseYear}>{movie.releaseYear}</div>
                <div className={style.overview}>{movie.overview}</div>
            </div>
            <div className={style.buttonContainer}>
                <Link to={`/`}>
                    <div className={style.button}>
                        Return to Search results
                    </div>
                </Link>
            </div>
        </>
    );
}