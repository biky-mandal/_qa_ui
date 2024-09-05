import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1'
    }),
    tagTypes: ['Q&A'],
    endpoints: (builder) => ({
        // Questions
        createQAByUser: builder.mutation({
            query: (data) => ({
                url: '/question/create',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['Q&A']
        }),

        questionAnswersByUser: builder.query({
            query: (_id) => ({
                url: `/question/fetchQA?createdBy=${_id}`,
                method: 'GET',
                credentials: 'include'
            }),
            providesTags: ['Q&A']
        }),
    })
})

// Exporting hook
export const { useCreateQAByUserMutation, useQuestionAnswersByUserQuery } = apis; 