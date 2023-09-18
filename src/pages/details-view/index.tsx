import styles from './styles.module.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiService from '@/services/api-service';
import posterNaImagePath from '@/assets/poster_na.jpg';
import { Movie, createMovie } from '@/models/movie';
import { BackgroundContainer } from '@/components/background-container';
import { Header } from '@/layout/header';

export const DetailsView = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        ApiService.getMovieById(id as string).then((movie) => setMovie(createMovie(movie)));
    }, [id]);

    if (!movie) {
        return (null);
    }

    const posterPath = movie.posterPath
        ? `https://image.tmdb.org/t/p/original${movie.posterPath}`
        : posterNaImagePath;

    const backdropPath = movie.backdropPath
        ? `https://image.tmdb.org/t/p/original${movie.backdropPath}`
        : '/background.png';

    return (
        <BackgroundContainer imagePath={backdropPath}>
            <Header />
            <div className={styles.details}>
                <div className={styles.poster}>
                    <img
                        src={posterPath}
                        alt={movie.title}
                    />
                </div>
                <div className={styles.title}>{movie.title}</div>
                <div className={styles.releaseYear}>{movie.releaseYear}</div>
                <div className={styles.overview}>{movie.overview}</div>
            </div>
            <div className={styles.buttonContainer}>
                <Link to={`/`}>
                    <div className={styles.button}>
                        Return to Search results
                    </div>
                </Link>
            </div>
        </BackgroundContainer>
    );
}