module.exports = {
  env: {
    DEV_URL: process.env.DEV_URL,
    PROD_URL: process.env.PROD_URL,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: `empty`,
      };
    }
    return config;
  },
};
