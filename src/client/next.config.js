/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "@/styles/globalsVar.scss";`,
  },
  images: {
    domains: ['ossimg.xinli001.com', 'res.xmcs.cn', process.env.HOST_NAME],
  },
  distDir: '../../.next',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
