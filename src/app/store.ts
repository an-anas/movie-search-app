import { searchViewSlice } from "@/pages/search-view/slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        search: searchViewSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;