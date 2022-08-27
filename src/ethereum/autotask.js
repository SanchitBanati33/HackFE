const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");
const axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3();

const inputs = [
  {
    name: "_operator",
    type: "address",
    indexed: true,
  },
  {
    name: "_from",
    type: "address",
    indexed: true,
  },
  {
    name: "_to",
    type: "address",
    indexed: true,
  },
  {
    name: "_id",
    type: "uint256",
    indexed: false,
  },
  {
    name: "_amount",
    type: "uint256",
    indexed: false,
  },
];

// Main function, exported separately for testing
exports.main = async function (signer, recipient, payload) {
  // Create contract instance from the relayer signer

  // Check relayer balance via the Defender network provider
  const relayer = await signer.getAddress();
  console.log("relayer: ", relayer);

  let events = payload.events;

  for (let i = 0; i < events.length; i++) {
    let evt = events[i];
    console.log("transaction: ");
    console.log("Number of logs: ", evt.transaction.logs.length);
    console.log(evt.transaction.logs);

    for (let j = 0; j < evt.transaction.logs.length; j++) {
      const log = evt.transaction.logs[j];
      if (
        log.topics.length > 0 &&
        log.topics[0] ===
          "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62"
      ) {
        const hexString = evt.transaction.logs[0].data;
        const retTopics = evt.transaction.logs[0].topics;

        let topics = [];

        retTopics.map((topic, index) => {
          if (index > 0) topics.push(topic);
        });

        const decodedLog = web3.eth.abi.decodeLog(inputs, hexString, topics);
        console.log(decodedLog);

        var token_id = decodedLog._id;

        console.log("token id: ", token_id);
      }
    }

    const to = evt.transaction.from;
    const burn_hash = evt.transaction.transactionHash;

    try {
      const url = "https://prod.ethbarcelona.kraznikunderverse.com/qrcode";
      var tkt_data = {
        walletAddress: to,
        tokenID: token_id,
        hash: burn_hash,
      };
      await axios.post(url, tkt_data, {
        headers: {
          "Content-Type": "application/json",
          validate: "alpha romeo tango",
        },
      });
    } catch (err) {
      if (typeof token_id === "undefined") {
        throw err;
      }
      console.error(err);
    }
  }

  return tkt_data;
};

// Entrypoint for the Autotask
exports.handler = async function (event) {
  const {
    body, // Object with JSON-parsed POST body
    headers, // Object with key-values from HTTP headers
    queryParameters, // Object with key-values from query parameters
  } = event.request;
  // Initialize defender relayer provider and signer
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, {
    speed: "fast",
  });
  const payload = body;

  return exports.main(signer, await signer.getAddress(), payload); // Send funds to self
};
