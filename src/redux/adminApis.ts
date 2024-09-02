import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../constants/config";


export const adminApis = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}`
    }),

    endpoints: (builder) => ({

        // Users
        fetchUsers: builder.query({
            query: () => ({
                url: '/user/admin/users',
                method: 'GET',
                credentials: 'include'
            })
        }),


        // Categories
        categories: builder.query({
            query: () => ({
                url: '/category/admin/categories',
                method: 'GET',
                credentials: 'include'
            })
        }),

    })
})

export const { useFetchUsersQuery, useCategoriesQuery } = adminApis;