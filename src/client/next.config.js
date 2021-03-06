/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "@/styles/globalsVar.scss";`,
  },
  images: {
    domains: [
      'ossimg.xinli001.com',
      'res.xmcs.cn',
      new URL(process.env.NEXT_PUBLIC_ORIGIN).hostname,
    ],
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
