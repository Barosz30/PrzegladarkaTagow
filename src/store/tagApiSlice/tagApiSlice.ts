import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagsResponse } from '../../types/TagsResponse';

export const tagApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.stackexchange.com/2.3' }),
  endpoints: (builder) => ({
    getTags: builder.query<TagsResponse, { page: number; pageSize: number; order: string}>({
      query: ({ page, pageSize, order }) => `/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=popular&site=stackoverflow`,
    }),
  }),
});

export const { useGetTagsQuery } = tagApiSlice;
