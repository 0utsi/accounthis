import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	devIndicators: {
		buildActivity: true,
		appIsrStatus: true,
	},
};

export default nextConfig;
