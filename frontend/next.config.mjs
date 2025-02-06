/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "loremflickr.com" },
    ],
  },
};

export default nextConfig;
