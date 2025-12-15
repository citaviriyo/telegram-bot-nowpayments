/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  async redirects() {
    return [
      {
        source: "/success.html",
        destination: "/success",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
