// generate the redux slice for the search view

import { Movie, createMovie } from "@/models/movie";
import ApiService from "@/services/api-service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: SearchState = {
    isSearching: false,
    isError: false,
    keyword: '',
    movies: [],
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
};

export interface SearchState {
    isSearching: boolean;
    isError: boolean;
    keyword: string;
    movies: Movie[];
    currentPage: number;
    totalPages: number;
    totalResults: number;
}

export const searchViewSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.movies = [];
            state.currentPage = 0;
            state.totalPages = 0;
            state.totalResults = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMoviesList.fulfilled, (state, action) => {
            state.isSearching = false;
            state.isError = false;
            state.keyword = action.meta.arg.query;
            state.movies = action.payload.results.map((movie) => createMovie(movie));
            state.currentPage = action.payload.page;
            state.totalPages = action.payload.total_pages;
            state.totalResults = action.payload.total_results;
        });
        builder.addCase(getMoviesList.rejected, (state) => {
            state.isSearching = false;
            state.isError = true;
            state.movies = [];
            state.currentPage = 0;
            state.totalPages = 0;
            state.totalResults = 0;
        });
        builder.addCase(getMoviesList.pending, (state, action) => {
            state.isSearching = Boolean(action.meta.arg.isSearching);
            state.isError = false;
        });
    },
});

export const getMoviesList = createAsyncThunk(
    'search/getMoviesList',
    async (params: { query: string, page: number, isSearching?: boolean }) => {
        const response = await ApiService.getMoviesList(params.query, params.page);
        return response;
    }
);

export const { clearSearchResults } = searchViewSlice.actions;

export const selectSearchState = (state: {search: SearchState}) => state.search;

export default searchViewSlice.reducer;
