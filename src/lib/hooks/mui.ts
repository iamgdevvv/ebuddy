import { useNotifications, type ShowNotificationOptions } from '@toolpad/core/useNotifications';
import { useId } from 'react';

const useNotification = (key?: string) => {
	const hookId = useId();
	const notifications = useNotifications();

	return {
		show: (message: string, options: ShowNotificationOptions) => {
			notifications.show(message, {
				key: key || hookId,
				autoHideDuration: 3000,
				...options,
			});
		},
		close: () => notifications.close(key || hookId),
	};
};

export { useNotification };
