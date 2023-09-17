import { useAppDispatch, useAppSelector, useDebounce } from "@/app/hooks";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { clearSearchResults, getMoviesList, selectSearchState } from "./slice";

export const SearchView = () => {
    const dispatch = useAppDispatch();
    const { isSearching, isError, keyword, currentPage, totalPages, totalResults, movies }
        = useAppSelector(selectSearchState);

    const [searchQuery, setSearchQuery] = useState(keyword);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const searchMovies = useCallback((page: number, isSearching?: boolean) => {
        dispatch(getMoviesList({ query: debouncedSearchQuery, page, isSearching }));
    }, [debouncedSearchQuery, dispatch]);

    useEffect(() => {
        if (totalResults > 0 && debouncedSearchQuery === keyword) {
            return;
        }

        if (debouncedSearchQuery.length > 2) {
            searchMovies(1, true);
        }
        else {
            dispatch(clearSearchResults());
        }
    }, [debouncedSearchQuery, dispatch, keyword, searchMovies, totalResults]);

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
            {totalResults === 0 && !isSearching && (<div>No results found</div>)}
            {isError && <div>Something went wrong!</div>}

            <div className={style.results}>
                {movies && movies.map((movie) => (
                    <div className={style.resultContainer} key={movie.id}>
                        <Link to={`/details/${movie.id}`}>
                            <div key={movie.id} className={style.result}>
                                {movie.title} {movie.releaseYear}
                            </div>
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
            </div >
        </>
    );
}