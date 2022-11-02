const packageJson = require("./package.json");

const { version, description } = packageJson;

const config = {
  makers: [
    // {
    //   name: "@electron-forge/maker-zip",
    // },
    {
      name: "@electron-forge/maker-deb",
      platforms: ["linux"],
      config: {
        options: {
          maintainer: "oeyoews",
          homepage: "https://github.com/oeyoews",
          icon: "src/static/images/icon.ico",
        },
      },
    },
    {
      name: "@reforged/maker-appimage",
      config: {
        options: {
          maintainer: "oeyoews",
          homepage: "https://github.com/oeyoews",
          icon: "src/static/images/icon.ico",
        },
      },
    },
  ],
};

module.exports = config;