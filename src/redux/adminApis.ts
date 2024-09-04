import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../constants/config";


export const adminApis = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}`
    }),
    tagTypes: ['User', 'Category', 'Country', 'Q&A'],

    endpoints: (builder) => ({

        // Users
        fetchUsers: builder.query({
            query: () => ({
                url: '/user/admin/users',
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['User']
        }),


        // Categories
        categories: builder.query({
            query: () => ({
                url: '/category/admin/categories',
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['Category']
        }),

        createCategory: builder.mutation({
            query: (data) => ({
                url: '/category/admin/create',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['Category']
        }),

        createSubCategory: builder.mutation({
            query: (data) => ({
                url: '/subcategory/admin/create',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['Category']
        }),

        deleteCategory: builder.mutation({
            query: (_id) => ({
                url: `/category/admin/delete?_id=${_id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Category']
        }),

        // Country
        countries: builder.query({
            query: () => ({
                url: '/country/admin/countries',
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['Country']
        }),

        createCountry: builder.mutation({
            query: (data) => ({
                url: '/country/admin/add',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['Country']
        }),

        createState: builder.mutation({
            query: (data) => ({
                url: '/state/admin/add',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['Country']
        }),

        // Questions
        createQuestionAnswer: builder.mutation({
            query: (data) => ({
                url: '/question/create',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['Q&A']
        }),

        questionAnswers: builder.query({
            query: () => ({
                url: '/question/fetchAllWithAns',
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['Q&A']
        }),
    })
})

export const {
    useFetchUsersQuery,
    useCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useCreateSubCategoryMutation,
    useCountriesQuery,
    useCreateCountryMutation,
    useCreateStateMutation,
    useCreateQuestionAnswerMutation,
    useQuestionAnswersQuery
} = adminApis;