// next.config.js

export const reactStrictMode = true;
export async function rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://travel-bus-81kx.onrender.com/api/:path*', // Proxy to Backend
    },
  ];
}
