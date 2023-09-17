import style from './style.module.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../../models/movie';
import { TmdbService } from '@/services/tmdb-service';
import posterNaImagePath from '@/assets/poster_na.jpg';

export const DetailsView = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        TmdbService.getMovieById(id as string).then((movie) => setMovie(new Movie(movie)));
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
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
            <div className={style.button}>
                <Link to={`/`}>
                    Return to Search results
                </Link>
            </div>
        </>
    );
}