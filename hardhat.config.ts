import type { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "hardhat-typechain";
import "hardhat-gas-reporter";

const fs = require('fs');
const privatekey = fs.readFileSync(".privatekey").toString().trim();

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      blockGasLimit: 100000000,
      allowUnlimitedContractSize: true,
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/OggViTyFaEvW5R_EGcYMj0bQ6MlsdeFl",
      accounts: [privatekey]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100000,
          },
        },
      },
    ],
  },
};
export default config;
