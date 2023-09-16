import { useDebounce } from "@/hooks/use-debounce";
import { Movie } from "@/models/movie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { TmdbService } from "@/services/tmdb-service";

export const SearchView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isError, setIsError] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery.length >= 3) {
            setSearchResults([]);
            setIsSearching(true);
            setIsError(false);
            TmdbService.searchMovies(debouncedSearchQuery, 1)
                .then((response) => {
                    setSearchResults(response.results.map(result=> new Movie(result)));
                    setIsSearching(false);
                })
                .catch(() => {
                    setIsError(true);
                    setIsSearching(false);
                });
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchQuery]);

    return (
        <>
            <div className={style.header}>TMSE: The Movie Search Engine</div>
            <hr />
            <div className={style.searchBar}>
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                {isSearching && <div>Searching...</div>}
                {isError && <div>Something went wrong!</div>}

                <div className={style.results}>
                    {searchResults && searchResults.map((movie) => (
                        <div key={movie.id} className={style.result}>
                            <Link to={`/details/${movie.id}`}>
                                {movie.title} {movie.releaseYear}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}