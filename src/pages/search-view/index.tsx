import { useAppDispatch, useAppSelector, useDebounce } from "@/app/hooks";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { getMoviesList } from "./slice";

export const SearchView = () => {
    const dispatch = useAppDispatch();
    const { isSearching, isError, keyword, currentPage, totalPages, movies }
        = useAppSelector((state) => state.search);

    const [searchQuery, setSearchQuery] = useState(keyword);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const searchMovies = useCallback((page: number) => {
        dispatch(getMoviesList({ query: debouncedSearchQuery, page }));
    }, [debouncedSearchQuery, dispatch]);

    useEffect(() => {
        if (debouncedSearchQuery.length > 2) {
            searchMovies(1);
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
                {movies && movies.map((movie) => (
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