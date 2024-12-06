import { z } from 'zod';
import { zBool } from '@utils/zod';

const UserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	username: z.string(),
	isActive: zBool.default(true),
});

const QueryUserSchema = z.object({
	auth: zBool.optional(),
});

const QueriesUserSchema = UserSchema.omit({ id: true }).merge(QueryUserSchema);

const PayloadUserSchema = UserSchema.omit({ id: true });

const UpdateUserSchema = PayloadUserSchema.partial();

type User = z.infer<typeof UserSchema>;
type QueryUser = z.infer<typeof QueryUserSchema>;
type QueriesUser = z.infer<typeof QueriesUserSchema>;
type UpdateUser = z.infer<typeof UpdateUserSchema>;

export { UserSchema, QueryUserSchema, QueriesUserSchema, PayloadUserSchema, UpdateUserSchema };

export type { User, QueryUser, QueriesUser, UpdateUser };
