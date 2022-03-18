module.exports = {
  images: {
    domains: ["lucis-image.s3.ap-southeast-1.amazonaws.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  pageExtensions: ["page.tsx", "page.ts"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
}
