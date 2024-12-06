import { cookies } from 'next/headers';
import { Container } from '@mui/material';
import Header from '@components/layout/header';
import { isLogin } from '@utils/auth';

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();

	const isLoggedin = isLogin(cookieStore);

	return (
		<>
			<Header isLoggedin={isLoggedin} />
			<Container
				maxWidth='lg'
				sx={{
					marginTop: 4,
				}}
			>
				{children}
			</Container>
		</>
	);
}
