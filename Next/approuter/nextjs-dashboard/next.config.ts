import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['bcrypt', 'postgres'],
    turbo: {
      rules: {
        '*.html': {
          loaders: ['ignore-loader'],
        },
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('bcrypt', 'postgres');
    }
    
    // Ignore problematic files
    config.module.rules.push({
      test: /\.html$/,
      use: 'ignore-loader',
    });
    
    return config;
  },
};

export default nextConfig;
