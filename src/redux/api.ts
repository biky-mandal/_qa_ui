import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserLogin, IUserRegister } from '../interface/IUser';

export const apis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1'
    }),
    endpoints: (builder) => ({
        me: builder.query<any, string>({
            query: () => ({
                url: '/user/me',
                credentials: 'include'
            })
        }),
        register: builder.mutation<any, IUserRegister>({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData,
                credentials: 'include'
            })
        }),
        login: builder.mutation<any, IUserLogin>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData,
                credentials: 'include'
            })
        }),
        logout: builder.query<any, string>({
            query: () => ({
                url: '/user/logout',
                credentials: 'include'
            })
        }),
    })
})

// Exporting hook
export const { useMeQuery, useLogoutQuery, useRegisterMutation, useLoginMutation } = apis; 