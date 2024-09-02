import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import { apis } from "./api";
import { adminApis } from "./adminApis";

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [apis.reducerPath]: apis.reducer,
        [adminApis.reducerPath]: adminApis.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apis.middleware).concat(adminApis.middleware)
});