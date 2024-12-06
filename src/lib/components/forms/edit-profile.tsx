'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl, FormLabel, Skeleton, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { update } from '@actions/me';
import { useNotification } from '@hooks/mui';
import { useGetProfile } from '@hooks/me';
import MeAPI from '@/store/apis/me';

type Props = {
	disabled?: boolean;
};

export default function EditProfileForm({ disabled }: Props) {
	const router = useRouter();
	const notifications = useNotification();
	const { triggerProfile, isLoadingProfile, dataProfile } = useGetProfile();
	const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
	const [state, action] = useActionState(update, undefined);

	useEffect(() => {
		triggerProfile({});
	}, [triggerProfile]);

	useEffect(() => {
		if (state && !state.success) {
			notifications.show(state.message, {
				severity: 'error',
			});

			if (state.errors) {
				setFieldErrors(state.errors);
			}

			return () => {
				notifications.close();
			};
		}
	}, [notifications, state]);

	useEffect(() => {
		if (state && state.success) {
			MeAPI.util.invalidateTags(['Me']);
			router.push('/?type=profile');
		}
	}, [router, state]);

	if (isLoadingProfile) {
		return <SkeletonEditProfileForm />;
	}

	return (
		<Box
			component='form'
			action={action}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
		>
			<FormControl>
				<FormLabel htmlFor='username'>Username</FormLabel>
				<TextField
					id='username'
					name='username'
					fullWidth
					disabled={disabled}
					defaultValue={
						state?.data && 'username' in state?.data ? state.data.username : dataProfile?.username
					}
					error={!!fieldErrors.username}
					helperText={fieldErrors.username}
					onChange={() => {
						setFieldErrors({
							...fieldErrors,
							username: undefined,
						});
					}}
				/>
			</FormControl>
			<FormControl>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<TextField
					id='email'
					name='email'
					fullWidth
					disabled={disabled}
					defaultValue={state?.data && 'email' in state?.data ? state.data.email : dataProfile?.email}
					error={!!fieldErrors.email}
					helperText={fieldErrors.email}
					onChange={() => {
						setFieldErrors({
							...fieldErrors,
							email: undefined,
						});
					}}
				/>
			</FormControl>
			{!disabled ? <SubmitButton /> : null}
		</Box>
	);
}

function SkeletonEditProfileForm() {
	return (
		<Box
			component='form'
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
		>
			<div>
				<Skeleton
					variant='rounded'
					width={80}
					height={20}
					sx={{ marginBottom: 1 }}
				/>
				<Skeleton
					variant='rounded'
					height={40}
				/>
			</div>
			<div>
				<Skeleton
					variant='rounded'
					width={80}
					height={20}
					sx={{ marginBottom: 1 }}
				/>
				<Skeleton
					variant='rounded'
					height={40}
				/>
			</div>
		</Box>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	if (pending) {
		return (
			<LoadingButton
				type='button'
				loading
			>
				Update
			</LoadingButton>
		);
	}

	return <Button type='submit'>Update</Button>;
}
