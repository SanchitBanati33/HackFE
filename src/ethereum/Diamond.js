// import web3 from "./web3";
import ABI from "@doingud/contracts/abi/DoinGudDiamondFull.json";
import { DOINGUD_DIAMOND_ADDRESS } from "@doingud/contracts/dist/adresses";
import { config } from "../config/config";
const Web3 = require("web3");

const provider = new Web3.providers.HttpProvider(config.alchemyUrl);

const web3 = new Web3(provider);

const Diamond = new web3.eth.Contract(
  ABI,
  config.contractAddress
  // "0xE3A161EdD679fC5ce2dB2316a4B6f7ab33a8eD6A" // doingud erc1155 polygon
  // "0x4137cF37598EE871d1F4A6DEE9188217Ed40c649" // mumbai doingud
  // "0x4137cF37598EE871d1F4A6DEE9188217Ed40c649"
);

export default Diamond;
