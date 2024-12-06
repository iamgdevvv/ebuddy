import * as React from 'react';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LoginForm from '@components/forms/login';

export default async function LoginPage() {
	return (
		<>
			<Typography
				component='h1'
				variant='h4'
				sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
			>
				Sign in
			</Typography>
			<LoginForm />
			<Divider>
				<Typography sx={{ color: 'text.secondary' }}>or</Typography>
			</Divider>
			<Typography sx={{ textAlign: 'center' }}>
				Doesn&apos;t have an account?{' '}
				<Link
					href='/register'
					variant='body2'
					sx={{ alignSelf: 'center' }}
				>
					Sign up
				</Link>
			</Typography>
		</>
	);
}
