/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/success.html",
        destination: "/success",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
