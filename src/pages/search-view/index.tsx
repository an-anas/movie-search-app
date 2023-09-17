import { useDebounce } from "@/hooks/use-debounce";
import { Movie } from "@/models/movie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { TmdbService } from "@/services/tmdb-service";

export const SearchView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [isError, setIsError] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery.length >= 3) {
            setSearchResults([]);
            setIsSearching(true);
            setIsError(false);
            TmdbService.searchMovies(debouncedSearchQuery, page)
                .then((response) => {
                    setSearchResults(response.results.map(result => new Movie(result)));
                    setPage(response.page);
                    setTotalPages(response.total_pages);
                    setIsSearching(false);
                })
                .catch(() => {
                    setIsError(true);
                    setIsSearching(false);
                });
        } else {
            setSearchResults([]);
            setTotalPages(0);
        }
    }, [debouncedSearchQuery, page]);

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

                {totalPages > 1 && (
                    <div className={style.pagination}>
                        <button onClick={() => setPage(1)} disabled={page === 1}>First</button>
                        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <div className={style.page}>Page {page}</div>
                        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
                        <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last</button>
                    </div>
                )}
            </div>
        </>
    );
}