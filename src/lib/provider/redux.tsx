'use client';
import { useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@store/redux';

export default function ReduxProvider({ children }: { children: ReactNode }) {
	const storeRef = useRef<AppStore>(makeStore());

	return <Provider store={storeRef.current}>{children}</Provider>;
}
