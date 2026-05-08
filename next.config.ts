import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    // Run dev server on port 3001
    // (use: next dev --port 3001 OR set here)
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
        ],
    },
}

export default nextConfig