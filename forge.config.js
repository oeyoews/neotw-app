const packageJson = require("./package.json");

const { version, description } = packageJson;

const config = {
  makers: [
    // {
    //   name: "@electron-forge/maker-zip",
    // },
    // {
    //   name: "@rabbitholesyndrome/electron-forge-maker-portable",
    //   platforms: ["win32"],
    //   config: {
    //     appId: "neotw-appp",
    //   },
    // },
    {
      name: "@electron-forge/maker-squirrel",
      platforms: ["win32"],
      config: {},
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
  ],
};

module.exports = config;
