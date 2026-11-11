import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Root goes to the new site; /cv.pdf and other assets stay served here.
        source: "/",
        destination: "https://ordel.dev",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
