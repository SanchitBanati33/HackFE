// import Web3 from "web3";
const Web3 = require("web3");

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //We are in the browser and metamask is running.
  // web3 = new Web3(window.web3.currentProvider);
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    // "https://polygon-mumbai.g.alchemy.com/v2/T95ylN-bR7zmaXiaZkP0R1sOObutgv-M"
    "https://polygon-mainnet.g.alchemy.com/v2/VX9hsINm25dNmmBqKi9ydn_iBW4sio4i"
  );

  // "https://rinkeby.infura.io/v3/97c2d52095a84da7a0b710a8daa16acf"
  web3 = new Web3(provider);
}

module.exports = web3;
