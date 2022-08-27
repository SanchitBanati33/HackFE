import React from "react";
import styled from "styled-components";
import Logo from "../../assets/Logo.svg";
import "./style.css";

export const Navbar = styled.div`
  background: black;
`;

export const Info = styled.div`
  background: grey;
  height: 200px;
`;

export const Title = styled.div`

`

export const MintingInfo = styled.div``;

const Mint = () => {
  return (
    <>
      <Navbar>
        <img src={Logo} className="image" />
      </Navbar>
      <Info></Info>
      <MintingInfo>
        <form>
          <label>
            <Title> Title </Title>
            <input type="text" placeholder="High AF" className="input" />
          </label>

        </form>
      </MintingInfo>
    </>
  );
};

export default Mint;
