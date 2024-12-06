'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { login } from '@actions/auth';
import { useNotification } from '@hooks/mui';

export default function LoginForm() {
	const router = useRouter();
	const notifications = useNotification();
	const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
	const [state, action] = useActionState(login, undefined);

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
			router.push('/');
		}
	}, [router, state]);

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
					defaultValue={state?.data && 'username' in state?.data ? state.data.username : ''}
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
				<FormLabel htmlFor='password'>Password</FormLabel>
				<TextField
					id='password'
					name='password'
					type='password'
					fullWidth
					defaultValue={state?.data && 'password' in state?.data ? state.data.password : ''}
					error={!!fieldErrors.password}
					helperText={fieldErrors.password}
					onChange={() => {
						setFieldErrors({
							...fieldErrors,
							password: undefined,
						});
					}}
				/>
			</FormControl>
			<SubmitButton />
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
				Login
			</LoadingButton>
		);
	}

	return <Button type='submit'>Login</Button>;
}
