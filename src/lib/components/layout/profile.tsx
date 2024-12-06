'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Button, Card } from '@mui/material';
import EditProfileForm from '@components/forms/edit-profile';

export default function Profile() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const type = searchParams.get('type');

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 1,
					marginTop: 2,
				}}
			>
				<Button
					variant={type === 'profile' ? 'contained' : 'outlined'}
					onClick={() => {
						router.push('/?type=profile');
					}}
				>
					Profile
				</Button>
				<Button
					variant={type === 'edit-profile' ? 'contained' : 'outlined'}
					onClick={() => {
						router.push('/?type=edit-profile');
					}}
				>
					Edit Profile
				</Button>
			</Box>
			{type ? (
				<Card
					variant='outlined'
					sx={{ maxWidth: 400, padding: 3, marginTop: 2 }}
				>
					<EditProfileForm disabled={type === 'profile'} />
				</Card>
			) : null}
		</>
	);
}
