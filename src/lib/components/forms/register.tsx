'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { register } from '@actions/auth';
import { useNotification } from '@hooks/mui';

export default function RegisterForm() {
	const router = useRouter();
	const notifications = useNotification();
	const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
	const [state, action] = useActionState(register, undefined);

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
			router.push('/register');
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
					defaultValue={state?.data?.username}
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
					type='email'
					fullWidth
					defaultValue={state?.data?.email}
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
				Register
			</LoadingButton>
		);
	}

	return <Button type='submit'>Register</Button>;
}
