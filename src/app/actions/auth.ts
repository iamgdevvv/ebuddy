'use server';

import { ZodError } from 'zod';
import { LoginSchema, RegisterSchema } from '@schemas/auth';
import { queryLogin, queryRegister } from '@apis/auth';
import { cookies } from 'next/headers';
import { setCookieToken, deleteCookieToken } from '@utils/auth';
import { redirect } from 'next/navigation';

async function register(_: FormAction | undefined, formData: FormData) {
	const formValue = {
		username: formData.get('username'),
		email: formData.get('email'),
		password: formData.get('password'),
	};

	try {
		const payload = RegisterSchema.parse(formValue);

		const registerUser = await queryRegister(payload);

		if (!registerUser.success) {
			throw new Error(registerUser.message);
		}

		return {
			success: true,
			statusCode: 200,
			message: 'User registered successfully',
			data: registerUser.data,
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
			message: 'Failed to register',
			data: formValue,
		};
	}
}

async function login(_: FormAction | undefined, formData: FormData) {
	const formValue = {
		username: formData.get('username'),
		password: formData.get('password'),
	};

	try {
		const payload = LoginSchema.parse(formValue);

		const loginUser = await queryLogin(payload);

		if (!loginUser.success) {
			throw new Error(loginUser.message);
		}

		const cookieStore = await cookies();

		setCookieToken(cookieStore, loginUser.data);

		return {
			success: true,
			statusCode: 200,
			message: 'User logged in successfully',
			data: loginUser.data,
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

async function logout() {
	deleteCookieToken(await cookies());
	redirect('/login');
}

export { register, login, logout };
