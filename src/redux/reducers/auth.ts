import { createSlice, isAction } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAdmin: false,
    isAuthor: false,
    isLoading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.isAdmin = action.payload?.role === 'admin';
            state.isAuthor = action.payload?.role === 'author';
        },

        userNotExists: (state) => {
            state.user = null;
            state.isLoading = false;
            state.isAdmin = false;
            state.isAuthor = false;
        }
    },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;