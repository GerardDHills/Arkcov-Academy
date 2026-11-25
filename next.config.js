/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // The virtual campus is a standalone page in public/campus/index.html
  async rewrites() {
    return [{ source: '/campus', destination: '/campus/index.html' }];
  },
};

module.exports = nextConfig;
