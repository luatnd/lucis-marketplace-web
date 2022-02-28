const withLess = require("next-with-less")
const antd_custom_file = "/src/styles/antd-theme-custom.less"

module.exports = withLess({
  lessLoaderOptions: {
    additionalData: (content) => `${content}\n\n@import '${antd_custom_file}';`,
  },
  images: { loader: "custom" },
  pageExtensions: ["page.tsx", "page.ts"],
})
