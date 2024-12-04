import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ['**/dist/'],
	},
	...compat.extends('prettier', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'),
	{
		ignores: ['eslint.config.mjs', 'jest.config.js', 'node_modules', 'build', 'dist'],
	},
	{
		languageOptions: {
			parser: tsParser,
			sourceType: 'module',
		},

		rules: {
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-empty-object-type': 'warn',
		},
	},
];
