import { pathsToModuleNameMapper } from 'ts-jest';
import { readFile } from 'fs/promises';

const tsconfig = JSON.parse(await readFile(new URL('./tsconfig.json', import.meta.url)));

/** @returns {Promise<import('jest').Config>} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/src' }),
};
