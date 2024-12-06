import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { logout } from '@actions/auth';

export default function Header({ isLoggedin }: { isLoggedin: boolean }) {
	return (
		<AppBar
			position='sticky'
			color='transparent'
		>
			<Container maxWidth='lg'>
				<Toolbar style={{ padding: 0 }}>
					<Typography
						variant='h5'
						component='h1'
						sx={{ flexGrow: 1 }}
					>
						FrontEnd
					</Typography>
					{isLoggedin ? (
						<Button
							size='small'
							variant='outlined'
							onClick={logout}
						>
							Logout
						</Button>
					) : null}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
