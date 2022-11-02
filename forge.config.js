const packageJson = require("./package.json");

const { version, description } = packageJson;

const config = {
  makers: [
    {
      name: "@electron-forge/maker-zip",
    },
    {
      name: "@reforged/maker-appimage",
      config: {
        options: {
          icon: "src/static/icon/1.png",
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
          icon: "src/static/icon/1.png",
        },
      },
    },
  ],
};

module.exports = config;
