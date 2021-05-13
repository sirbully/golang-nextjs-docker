const path = require("path")

module.exports = {
  stories: ["../components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-scss",
      options: {
        cssLoaderOptions: {
          modules: true,
        },
      },
    },
  ],
}
