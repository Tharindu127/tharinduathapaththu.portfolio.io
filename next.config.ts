const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/tharinduathapaththu.portfolio.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tharinduathapaththu.portfolio.io/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;