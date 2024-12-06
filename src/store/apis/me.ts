import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { QueryUser, User } from '@schemas/me';

// Define a service using a base URL and expected endpoints
const MeAPI = createApi({
	reducerPath: 'me_auth',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_BASE_API}/api/me`,
	}),
	tagTypes: ['Me'],
	endpoints: (builder) => ({
		getProfile: builder.query<ResResult<User>, QueryUser>({
			query: (params) => ({
				url: '/',
				params,
			}),
			providesTags: ['Me'],
			transformErrorResponse: (response) => response.data,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetProfileQuery } = MeAPI;

export default MeAPI;
