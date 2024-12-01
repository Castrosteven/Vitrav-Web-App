/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "https://lh3.googleusercontent.com",
        pathname: "/",
      },
      {
        hostname: "places.googleapis.com",
      },
      {
        hostname: "maps.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
