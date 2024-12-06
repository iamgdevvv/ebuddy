'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { NotificationsProvider } from '@toolpad/core/useNotifications';

import muiTheme from '@theme/mui';

export default function MuiProvider({ children }: { children: JSX.Element }) {
	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ThemeProvider
				theme={muiTheme}
				defaultMode='light'
				disableTransitionOnChange
			>
				<NotificationsProvider>{children}</NotificationsProvider>
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
}
