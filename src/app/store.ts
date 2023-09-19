import { searchViewSlice } from "@/pages/search-view/slice";
import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";

export const store = configureStore({
    reducer: {
        search: searchViewSlice.reducer,
    },
    // middleware(getDefaultMiddleware) {
    //     return import.meta.env.DEV
    //         ? getDefaultMiddleware().concat(logger)
    //         : getDefaultMiddleware()
    // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;