import { useEffect, useMemo } from 'react';
import { rtkQueryLoading } from '@utils/redux';
import { logout } from '@actions/auth';
import { useLazyGetProfileQuery } from '@store/apis/me';
import { useNotification } from '@hooks/mui';

function useGetProfile() {
	const notifications = useNotification();
	const [triggerProfile, resultProfile] = useLazyGetProfileQuery();

	const isLoadingProfile = useMemo(() => {
		return rtkQueryLoading(resultProfile);
	}, [resultProfile]);

	const dataProfile = useMemo(() => {
		if (isLoadingProfile || resultProfile.isError) {
			return null;
		}

		return resultProfile.data?.data || null;
	}, [isLoadingProfile, resultProfile]);

	useEffect(() => {
		if (!isLoadingProfile && resultProfile.isError) {
			const resultError = resultProfile.error as Res;

			notifications.show(resultError.message || 'Something went wrong', {
				severity: 'error',
			});

			if (resultError.statusCode === 403 || resultError.statusCode === 401) {
				logout();
			}

			return () => {
				notifications.close();
			};
		}
	}, [isLoadingProfile, resultProfile, notifications]);

	return {
		isLoadingProfile,
		triggerProfile,
		dataProfile,
		resultProfile,
	};
}

export { useGetProfile };
