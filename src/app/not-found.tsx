'use client';

import { LinkBehaviour } from '@theme/customizations/navigation';
import { Button, Card, Stack, Typography } from '@mui/material';

export default function ErrorPage() {
	return (
		<Stack
			sx={{
				alignItems: 'center',
				justifyContent: 'center',
				width: 1,
				height: '100vh',
				paddingY: 4,
				paddingX: 2,
				minHeight: { xs: 450, sm: 600, md: 800 },
			}}
		>
			<Card>
				<Stack sx={{ alignItems: 'center', gap: 2, py: 4 }}>
					<Typography sx={{ width: { xs: 210, sm: 300 }, textAlign: 'center' }}>
						Looks like youve taken a wrong turn. Lets get you back on track!
					</Typography>
					<Button
						variant='contained'
						LinkComponent={LinkBehaviour}
						href='/'
					>
						Back to Home
					</Button>
				</Stack>
			</Card>
		</Stack>
	);
}
