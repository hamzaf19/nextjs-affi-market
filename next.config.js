/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow placeholder images from external domains during development
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
