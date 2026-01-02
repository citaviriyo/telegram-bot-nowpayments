/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Backward compatibility: success page lama
      {
        source: "/success.html",
        destination: "/success",
        permanent: true,
      },

      // Backward compatibility: cancel page lama
      {
        source: "/cancel.html",
        destination: "/cancel",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
