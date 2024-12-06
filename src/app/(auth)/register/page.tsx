import * as React from 'react';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import RegisterForm from '@components/forms/register';

export default async function RegisterPage() {
	return (
		<>
			<Typography
				component='h1'
				variant='h4'
				sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
			>
				Sign up
			</Typography>
			<RegisterForm />
			<Divider>
				<Typography sx={{ color: 'text.secondary' }}>or</Typography>
			</Divider>
			<Typography sx={{ textAlign: 'center' }}>
				Already have an account?{' '}
				<Link
					href='/login'
					variant='body2'
					sx={{ alignSelf: 'center' }}
				>
					Sign in
				</Link>
			</Typography>
		</>
	);
}
