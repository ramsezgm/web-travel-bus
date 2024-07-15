/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/dashboard/:path*',
        has: [
          {
            type: 'cookie',
            key: 'token',
          },
        ],
        destination: '/auth',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
