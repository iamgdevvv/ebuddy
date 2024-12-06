import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	env: {
		HOST_SERVER: process.env.HOST_SERVER,
	},
};

export default nextConfig;
