require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.GOERLI_PATH,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
