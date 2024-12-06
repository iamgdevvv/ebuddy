import { configureStore } from '@reduxjs/toolkit';
import MeAPI from '@store/apis/me';

export const makeStore = () => {
	return configureStore({
		reducer: {
			[MeAPI.reducerPath]: MeAPI.reducer,
		},
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}).concat(MeAPI.middleware),
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
