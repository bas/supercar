/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    clientSideID: process.env.LAUNCHDARKLY_CLIENT_ID,
  },
};

module.exports = nextConfig;
