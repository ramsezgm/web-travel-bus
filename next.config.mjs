// next.config.js

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://travel-bus-81kx.onrender.com/api/:path*', // Proxy to Backend
      },
    ];
  },
};
