import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RedeemOut, Redeem, Title, Description } from "../Redeem2";
import "./style.css";
import Unfold from "../../assets/Unfold.svg";
import Image from "../../assets/Image.svg";
import { Resolution } from "@unstoppabledomains/resolution";

import { useUploadArtwork, Claim } from "./functions";
import { config } from "../../config/config";
import { toChecksumAddress } from "ethereum-checksum-address";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Web3 from "web3";

export const Activity = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  display: flex;
  align-items: center;

  color: #2b2b2b;
  display: inline-block;
  line-height: 17px;
  /* identical to box height, or 140% */
  /* Grey 1 */
`;

export const LeaderboardBox = styled.div`
  background: #ffffff;
  border: 1px solid #c8ccd0;
  border-radius: 4px;
  height: 40px;
  margin: 10px 0 0 0;
`;
export const Info = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  display: flex;
  align-items: center;

  color: #2b2b2b;
  margin: 10px 8% 0 2%;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  justify-content: space-between;
  display: inline-block;
  /* Black */
  color: black;
`;

export const LeaderboardContainer = styled.div`
  margin: 25px 0 0 0;
  padding: 0 20px;
`;

const Container = styled.div`
  background: black;
  display: grid;
  justify-content: center;
  margin: 0 auto;
`;
const ImgContainer = styled.div`
  justify-items: center;
  img {
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
  @media (max-width: 700px) {
  }
`;

export const Footer = styled.div`
  height: 119.3px;

  width: 100%;
  padding: 30px 24px 30px 22px;
  margin: 10px 0 0 0;
  background: #354b37;
`;

const Forum = styled.div`
  @media (max-width: 800px) {
  }
`;

const Flex = styled.div`
  @media (max-width: 800px) {
    padding: 0;
    margin: 10% 0 5% 25%;
  }
`;

const Hero = styled.div``;

const Title2 = styled.div`
  font-family: "Dahlia";
  font-style: normal;
  font-weight: 400;
  font-size: 56px;
  line-height: 56px;
  /* identical to box height, or 100% */

  text-align: center;

  color: #ffd731;
`;

const Title3 = styled.div`
  font-family: "Dahlia";
  font-style: normal;
  font-weight: 700;
  font-size: 47px;
  line-height: 56px;
  /* identical to box height, or 119% */

  text-align: center;

  color: #ffd731;
`;

const Description2 = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  /* or 115% */
  padding: 0 47px;
  margin: 31px 0 43px 0;
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffd731;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 785px;
  background: black;
`;

export const Titles = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  display: flex;
  align-items: center;

  display: inline-block;
  text-transform: uppercase;
  color: #fffff;
  margin: 0 9% 0 0;
`;

const options = {
  headers: {
    validate: process.env.REACT_APP_VALIDATE_TOKEN,
  },
};

const EthMoments = () => {
  const { uploadFile } = useUploadArtwork();

  const [AccessToken, setAccessToken] = useState();
  const [file, setFile] = useState();
  const [momentsData, setMomentsData] = useState({
    title: "",
    description: "",
    walletAddresses: [],
  });
  const [enteredWallet, setEnteredWallet] = useState();
  const [walletAddresses, setWalletAddresses] = useState();
  const [nftTypeId, setNftTypeId] = useState();
  const [validTicketIds, setValidTicketIds] = useState([]);
  const [invalidTicketIds, setInvalidTicketIds] = useState([]);

  const [popup, setPopup] = useState(false);
  const [minting, setMinting] = useState(false);

  const [success, setSuccess] = useState(false);
  const [Error, setError] = useState(false);

  const getAccessToken = async () => {
    try {
      const url = `${config.apiBaseUrl}/getAccessToken`;
      const { data } = await axios.get(url);
      console.log("access token: ", data);
      setAccessToken(data);
    } catch (err) {}
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  // pass this file to our backend api
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    setFile(data);
    console.log("file: ", data);

    e.preventDefault();
  };

  const postToDb = async () => {
    try {
      const url = `${config.apiBaseUrl}/ethMoments`;
      console.log("url: ", url);
      const data = {
        addresses: momentsData.walletAddresses,
        creatorAddress: momentsData.walletAddresses[0],
      };
      console.log(data);
      await axios.post(url, data, config.authOptions);
      console.log("posted to db as well..");
    } catch (err) {
      console.log("error posting to db..");
    }
  };

  const mintAMoment = async () => {
    setError(false);
    console.log("minting..");
    setMinting(true);
    try {
      if (file && AccessToken) {
        var nftTypeId = await uploadFile(file, AccessToken, momentsData);
        setMinting(false);
      }
      setSuccess(true);
      setNftTypeId(nftTypeId);
      await postToDb();
    } catch (err) {
      setMinting(false);
      setError(true);
      console.error(err);
    }
  };

  const resolvedUNS = async (domain, currency = "ETH") => {
    try {
      const resolution = new Resolution();
      const address = await resolution.addr(domain, currency);
      return address;
    } catch (err) {
      console.error(err);
    }
  };

  const getListOfWalletAddresses = async (walletAddresses) => {
    try {
      console.log(walletAddresses);
      let walletAddressList = walletAddresses.split(",").map((address) => {
        if (address === "" || address === " ") return null;
        return address.trim();
      }); // split(/,|, /);

      walletAddressList = walletAddressList.filter(
        (address) => address !== null
      );
      console.log("wallet addresses: ", walletAddressList);

      let validOnes = [],
        invalidOnes = [];

      for (let i = 0; i < walletAddressList.length; i++) {
        var walletAddress = "";
        let address = walletAddressList[i].trim();
        try {
          if (address.trim().length !== 42 && address.slice(-3) === "eth") {
            var provider = new Web3.providers.HttpProvider(
              config.ethMainnetUrl
            );
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
          }
        } catch (err) {
          console.log("error resolving ens name");
          console.error(err);
        }

        console.log(i, " ", walletAddress, address);
        // && walletAddressList[i - 1] !== walletAddress
        if (walletAddress) {
          walletAddressList[i] = walletAddress;
          address = walletAddress;
        }

        if (address.length == 42) address = toChecksumAddress(address);

        if (address.length == 42 && toChecksumAddress(address)) {
          const card = renderValidTicketIds(address, i);
          validOnes.push(card);
        } else {
          const card = renderInvalidTicketIds(address, i);
          invalidOnes.push(card);
        }
      }

      setValidTicketIds(validOnes);
      setInvalidTicketIds(invalidOnes);

      // console.log("valid: ", validOnes);
      // console.log("invalid: ", invalidOnes);

      walletAddressList = walletAddressList.map((address) => {
        if (address.length === 42) {
          console.log("checksum: ", toChecksumAddress(address));
          return toChecksumAddress(address);
        }
        return address;
      });

      console.log("final: ", walletAddressList);

      setMomentsData({ ...momentsData, walletAddresses: walletAddressList });
    } catch (err) {
      console.error(err);
    }
  };

  const renderValidTicketIds = (walletAddress, i) => {
    return (
      <>
        <div className="correct" key={walletAddress}>
          {walletAddress.slice(0, 4)}....{walletAddress.slice(-4)}
        </div>
        <br />
      </>
    );
  };

  const renderInvalidTicketIds = (walletAddress, i) => {
    return (
      <>
        <div className="incorrect" key={walletAddress}>
          {walletAddress.slice(0, 4)}....{walletAddress.slice(-4)}
        </div>
        <br />
      </>
    );
  };

  return (
    <>
      <Container>
        <img src={Unfold} className="moment" />
        <img src={Image} className="moment" />
        <InputContainer>
          <Forum>
            <label className="text-moments">Title</label>
            <br />
            <input
              type="text"
              placeholder="High AF"
              className="input"
              value={momentsData.title}
              onChange={(e) => {
                setMomentsData({ ...momentsData, title: e.target.value });
              }}
            ></input>
            <br />

            <label className="text-moments">Description</label>
            <br />
            <textarea
              type="text"
              placeholder="On Shrooms"
              className="input"
              value={momentsData.description}
              onChange={(e) => {
                setMomentsData({ ...momentsData, description: e.target.value });
              }}
            ></textarea>
            <br />

            <label className="text-moments">ETH Address</label>
            <br />
            <input
              multiple
              type="text"
              placeholder="weed.eth, lsd.dao, coke.nft"
              className="input"
              value={walletAddresses}
              onChange={(e) => {
                getListOfWalletAddresses(e.target.value);
                setWalletAddresses(e.target.value);
              }}
            ></input>
            <p className="taggingInfo">
              Ex. test.eth, lsd.dao etc. (seprated by comma)
            </p>

            <Flex>
              {/* <img
                src={Upload}
                name="data"
                onClick={retrieveFile}
                className="ethbcnupload"
              ></img> */}

              <input
                type="file"
                className="file-upload"
                name="data"
                onChange={retrieveFile}
              ></input>
            </Flex>

            <RedeemOut
              // onClick={mintAMoment}
              onClick={() => {
                setPopup(true);
                setError(false);
                setSuccess(false);
              }}
              style={{
                // disable: minting ? true : false
                pointerEvents: popup ? "none" : null,
              }}
            >
              <span className="text-moments">Mint a Moment</span>
            </RedeemOut>

            <Popup
              trigger={<button className="profile"> See your Profile </button>}
              position="center"
            >
              <div className="inputwallet">
                <label>Enter your Wallet (ENS or UD)</label>
                <input
                  type="text"
                  placeholder="weed.eth, lsd.dao, coke.nft"
                  className="inputw"
                  value={enteredWallet}
                  onChange={(e) => setEnteredWallet(e.target.value)}
                ></input>
                {enteredWallet ? (
                  <Link to={`/profile/${enteredWallet}`}>Submit</Link>
                ) : (
                  <button className="submit">Submit</button>
                )}
              </div>
            </Popup>
          </Forum>
        </InputContainer>

        {/* PopUp to conifrm the NFTID's */}

        {popup ? (
          <div>
            <div className="box-third">
              <div onClick={() => setPopup(false)}>Close</div>

              <div className="title">
                Please Confirm the ETH Address Before Minting
              </div>

              {validTicketIds}

              {invalidTicketIds.length > 0 ? (
                <>
                  <div className="invalid">
                    Invalid ETH Address (Please input again)
                  </div>
                  <div className="yy">{invalidTicketIds}</div>
                </>
              ) : null}

              <button
                className="mintmoment"
                disabled={
                  invalidTicketIds.length > 0 || minting || success
                    ? true
                    : false
                }
                onClick={mintAMoment}
              >
                {minting ? (
                  <span>Minting...</span>
                ) : (
                  <span>Mint My Moment</span>
                )}
              </button>

              {minting ? (
                <Description style={{ color: "blacl" }}>
                  Please have patience...it's minting...
                </Description>
              ) : null}

              {success ? (
                <>
                  <Description style={{ color: "black" }}>
                    Successfully minted!!
                  </Description>
                  {nftTypeId ? (
                    <Description>
                      <a
                        href={`${config.dgAppBaseUrl}/creation/${nftTypeId}`}
                        target={"_blank"}
                        style={{ color: "black" }}
                      >
                        View your moment here -
                      </a>
                    </Description>
                  ) : null}
                </>
              ) : null}

              {Error ? (
                <Description style={{ color: "black" }}>
                  Got some Error!!
                </Description>
              ) : null}
            </div>
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default EthMoments;
