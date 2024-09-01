import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import { apis } from "./api";

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [apis.reducerPath]: apis.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apis.middleware)
});