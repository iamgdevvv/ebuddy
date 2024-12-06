import { Card, Typography } from '@mui/material';
import { Suspense } from 'react';
import Profile from '@/lib/components/layout/profile';

export default function Home() {

	return (
		<Card
			variant='highlighted'
			sx={{ padding: 4 }}
		>
			<Typography
				variant='h2'
				component='h1'
			>
				Welcome back!
			</Typography>
			<Suspense>
				<Profile />
			</Suspense>
		</Card>
	);
}
