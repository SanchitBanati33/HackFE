import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Unfold from "../../assets/Unfold.svg";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { config } from "../../config/config";
import { Resolution } from "@unstoppabledomains/resolution";
import axios from "axios";

const Container = styled.div`
  background: black;
  padding: 0 0 1000px 0;
`;

const Box = styled.div`
  border: 1px solid white;
  border-radius: 20px;
  height: 50px;
  gap: 20px;
  margin: 30px;
`;

const Detail = styled.div`
  font-family: GT Flexa;
  fontsize: 18px;
  color: white;
  margin: 10px 0 0 0;
`;

const resolvedUNS = async (domain, currency = "ETH") => {
  try {
    const resolution = new Resolution();
    const address = await resolution.addr(domain, currency);
    return address;
  } catch (err) {
    console.error(err);
  }
};

const Profile = () => {
  const { wallet } = useParams();
  const [walletAddress, setWalletAddress] = useState();
  const [walletInfo, setWalletInfo] = useState();

  const resolveIfEnsorUns = async (address) => {
    var walletAddress = "";
    try {
      if (address.trim().length !== 42 && address.slice(-3) === "eth") {
        var provider = new Web3.providers.HttpProvider(config.ethMainnetUrl);
        const web3 = new Web3(provider);
        walletAddress = await web3.eth.ens.getAddress(address.trim());
        console.log("wallet address: ", walletAddress);
      } else if (
        address.slice(-6) === "wallet" ||
        address.slice(-6) === "crypto" ||
        address.slice(-3) === "nft" ||
        address.slice(-10) === "blockchain" ||
        address.slice(-7) === "bitcoin" ||
        address.slice(-4) === "coin" ||
        address.slice(-3) === "888" ||
        address.slice(-3) === "dao" ||
        address.slice(-1) === "x"
      ) {
        walletAddress = await resolvedUNS(address, "ETH");
        console.log("wallet from uns: ", walletAddress);
      } else {
        if (address.length == 42) walletAddress = address; // 42 length
      }

      setWalletAddress(walletAddress);
    } catch (err) {
      console.log("error resolving ens name");
      console.error(err);
    }
  };

  useEffect(() => {
    resolveIfEnsorUns(wallet);
    console.log(wallet);
  });

  const getWalletImpacts = async () => {
    try {
      const url = `${config.apiBaseUrl}/getAddress/${walletAddress}`;
      const { data } = await axios.get(url, config.authOptions);
      console.log(data);
      setWalletInfo(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (walletAddress) getWalletImpacts();
  }, [walletAddress]);

  return (
    <>
      <Container>
        <img src={Unfold} />
        <Box>
          <Detail>Social Cause : Gitcoin Grants</Detail>
        </Box>

        <Box>
          <Detail>Creator Earning : $10</Detail>
        </Box>

        <Box>
          <Detail>Social Impact generated : $2</Detail>
        </Box>

        <Box>
          <Detail>Total Moments Created: {walletInfo?.creations}</Detail>
        </Box>

        <Box>
          <Detail>Total Moments Tagged : {walletInfo?.tagged}</Detail>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
