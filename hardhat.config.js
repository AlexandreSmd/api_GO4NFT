/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL2, PRIVATE_KEY2 } = process.env;
module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "zkEVM_testnet",
   networks: {
      hardhat: {},
      zkEVM_testnet: {
         url: API_URL2,
         accounts: [`0x${PRIVATE_KEY2}`]
      }
   },
}
