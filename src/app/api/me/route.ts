import { NextResponse, type NextRequest } from 'next/server';
import { getCookieToken } from '@utils/auth';
import { queryUser } from '@apis/user';

export async function GET(request: NextRequest) {
	const authToken = getCookieToken(request.cookies);

	if (!authToken) {
		return NextResponse.json(
			{
				success: false,
				message: 'User not logged in',
			},
			{
				status: 401,
			}
		);
	}

	const resultUser = await queryUser(authToken);

	return NextResponse.json(resultUser);
}
