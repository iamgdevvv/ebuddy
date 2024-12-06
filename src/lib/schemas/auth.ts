import { z } from 'zod';

const RegisterSchema = z.object({
	email: z.string().email(),
	username: z.string().min(1),
	password: z.string().min(1),
});

const LoginSchema = z.object({
	username: z.string().min(1),
	password: z.string().min(1),
});

type Register = z.infer<typeof RegisterSchema>;
type Login = z.infer<typeof LoginSchema>;

export { RegisterSchema, LoginSchema };
export type { Register, Login };
