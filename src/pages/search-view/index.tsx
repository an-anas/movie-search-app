import { useDebounce } from "@/hooks/use-debounce";
import { Movie } from "@/models/movie";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { TmdbService } from "@/services/tmdb-service";

export const SearchView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [isError, setIsError] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const searchMovies = useCallback((page: number) => {
        setIsError(false);
        TmdbService.searchMovies(debouncedSearchQuery, page).then((response) => {
            setIsSearching(false);
            if (response.results) {
                setSearchResults(response.results.map((movie) => new Movie(movie)));
                setCurrentPage(response.page);
                setTotalPages(response.total_pages);
            } else {
                setIsError(true);
            }
        });
    }, [debouncedSearchQuery]);

    useEffect(() => {
        if (debouncedSearchQuery) {
            setIsSearching(true);
            setIsError(false);
            searchMovies(1);
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchQuery, searchMovies]);

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
            </div>

            {isSearching && (<div>Searching...</div>)}
            {isError && <div>Something went wrong!</div>}

            <div className={style.results}>
                {searchResults && searchResults.map((movie) => (
                    <div key={movie.id} className={style.result}>
                        <Link to={`/details/${movie.id}`}>
                            {movie.title} {movie.releaseYear}
                        </Link>
                    </div>
                ))}

                {totalPages > 1 && (
                    <div className={style.pagination}>
                        <button onClick={() => searchMovies(1)} disabled={currentPage === 1}>First</button>
                        <button onClick={() => searchMovies(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <div className={style.page}>Page {currentPage} / {totalPages}</div>
                        <button onClick={() => searchMovies(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                        <button onClick={() => searchMovies(totalPages)} disabled={currentPage === totalPages}>Last</button>
                    </div>
                )}
            </div>
        </>
    );
}