'use server';

import { cookies } from 'next/headers';
import { ZodError } from 'zod';
import { updateUser } from '@apis/user';
import { getCookieToken } from '@utils/auth';
import { UpdateUserSchema } from '@schemas/me';

async function update(_: FormAction | undefined, formData: FormData) {
	const formValue = {
		username: formData.get('username'),
		email: formData.get('email'),
	};

	try {
		const payload = UpdateUserSchema.parse(formValue);

		const cookieStore = await cookies();

		const authToken = getCookieToken(cookieStore);

		if (!authToken) {
			return {
				success: false,
				statusCode: 401,
				message: 'User not logged in',
				data: formValue,
			};
		}

		const updateUserRecord = await updateUser(authToken, payload);

		if (!updateUserRecord.success) {
			throw new Error(updateUserRecord.message);
		}

		return {
			success: true,
			statusCode: 200,
			message: 'User updated successfully',
			data: updateUserRecord.data,
		};
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				success: false,
				statusCode: 400,
				message: 'Payload validation failed',
				errors: error.flatten().fieldErrors,
				data: formValue,
			};
		}

		if (error instanceof Error) {
			return {
				success: false,
				statusCode: 500,
				message: error.message,
				data: formValue,
			};
		}

		return {
			success: false,
			statusCode: 500,
			message: 'Failed to login',
			data: formValue,
		};
	}
}

export { update };
