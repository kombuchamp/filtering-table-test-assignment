import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TableEntry } from '../types/TableDataTypes';

/**
 * API service for fetching and caching data received from network
 *
 * Uses RTK query
 * @see https://redux-toolkit.js.org/rtk-query/overview
 */
export const API = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.PUBLIC_URL}`,
    }),
    endpoints: (builder) => ({
        fetchTableData: builder.query<TableEntry[], void>({
            query: () => ({
                url: '/data-200.json',
            }),
        }),
    }),
});
