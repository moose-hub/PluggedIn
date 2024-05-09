/** @type {import('next').NextConfig} */
const nextConfig = {};

// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // Modify the Webpack config
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
