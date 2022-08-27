import React from "react";
import styled from "styled-components";
import Logo from "../../assets/Logo.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./style.css";

export const Navbar = styled.div`
  background: black;
`;

export const Info = styled.div`
  background: grey;
  height: 200px;
`;

export const Title = styled.div`
  font-family: "GT Flexa";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;

  /* or 112% */

  text-align: left;

  /* Black */
  margin: 10px;

  color: #2b2b2b;
`;

export const MintingInfo = styled.div``;

export const Box = styled.div`
  background: #3f704d;
  border-radius: 50px;
  border: none;
  height: 30px;
  display: inline-block;
  width: 100px;
  padding: 5px;
  font-family: "GT Flexa";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #f6f7fb;
`;

const Mint = () => {
  return <div></div>;
  return (
    <>
      <Navbar>
        <img src={Logo} className="image" />
      </Navbar>
      <Info></Info>
      <MintingInfo>
        <form className="forum">
          <label>
            <Title> Title </Title>
            <input
              type="text"
              placeholder="Add a title to your moment"
              className="input"
              value={momentsData.title}
              onChange={(e) => {
                setMomentsData({ ...momentsData, title: e.target.value });
              }}
            />
          </label>
          <label>
            <Title> Description </Title>
            <textarea
              type="text"
              placeholder="Add a description to your moment"
              className="input-description"
              value={momentsData.description}
              onChange={(e) => {
                setMomentsData({ ...momentsData, description: e.target.value });
              }}
            ></textarea>
          </label>
          {/* <label>
            <Title> Creator </Title>
            <input type="text" placeholder="High AF" className="input" />
          </label>
          <label>
            <Title> Tag your Friends </Title>
            <input type="text" placeholder="High AF" className="input" />
          </label> */}
          <label className="text-moments">ETH Address</label>
          <br />
          <input
            multiple
            type="text"
            placeholder="Tag Yourself and your friends"
            className="input"
            value={walletAddresses}
            onChange={(e) => {
              getListOfWalletAddresses(e.target.value);
              setWalletAddresses(e.target.value);
            }}
          ></input>
          <p className="taggingInfo">
            Ex. test.eth, 0x5c0085E600398247a37de389931CCea8EdD3ba67, etc.
            (seprated by comma)
          </p>
        </form>
      </MintingInfo>

      <Popup
        trigger={<button className="mint"> Mint your Moment </button>}
        modal
      >
        {(close) => (
          <div className="modal">
            {/* <button className="close" onClick={close}>
              &times;
            </button> */}
            <Title> Confirm you are tagging your friends</Title>
            <Box>banati.eth</Box>
            <Box>banati.eth</Box>

            <Box>banati.eth</Box>
            <Box>banati.eth</Box>

            <button className="mint">Mint Now</button>
          </div>
        )}
      </Popup>
    </>
  );
};

export default Mint;
