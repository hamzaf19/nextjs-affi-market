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
    // Enable SVGs from placehold.co and lock down via CSP
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
