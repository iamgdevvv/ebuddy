import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const getCookieToken = (cookie: RequestCookies | ReadonlyRequestCookies): string | null => {
	return cookie.get('token')?.value || null;
};

const setCookieToken = (
	cookie: RequestCookies | ReadonlyRequestCookies,
	{ token, expiresIn }: { token: string; expiresIn: number }
) => {
	cookie.set('token', token, {
		httpOnly: true,
		maxAge: expiresIn,
		sameSite: 'strict',
	});
};

const deleteCookieToken = (cookie: RequestCookies | ReadonlyRequestCookies) => {
	cookie.delete('token');
};

const isLogin = (cookie: RequestCookies | ReadonlyRequestCookies): boolean => {
	return !!getCookieToken(cookie);
};

export { isLogin, getCookieToken, setCookieToken, deleteCookieToken };
