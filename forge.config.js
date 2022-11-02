const packageJson = require("./package.json");

const { version, description } = packageJson;

const config = {
  packagerConfig: {
    name: "Neotw",
    executableName: "Neotw",
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: "@electron-forge/maker-zip",
    // },
    {
      name: "@electron-forge/maker-deb",
      platforms: ["linux"],
      config: {
        options: {
          // icon: "src/static/icon/icon.png",
        },
      },
    },
  ],
};

module.exports = config;
