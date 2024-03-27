import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagsResponse } from '../../types/TagsResponse';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.stackexchange.com/2.3' }),
  endpoints: (builder) => ({
    getTags: builder.query<TagsResponse, void>({
      query: () => `/tags?order=desc&sort=popular&site=stackoverflow`,
    }),
  }),
});

export const { useGetTagsQuery } = apiSlice;