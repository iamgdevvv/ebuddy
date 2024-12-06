import { z } from 'zod';

const zBool = z
	.union([z.literal('true'), z.literal('false'), z.literal('1'), z.literal('0')])
	.transform(x => x === 'true' || x === '1')
	.pipe(z.boolean())
	.or(z.boolean());

export { zBool };
