import React, { useEffect, useState } from "react";
import Unfold from "../../assets/Unfold.svg";
import styled from "styled-components";
import { config } from "../../config/config";
import axios from "axios";

const Container = styled.div`
  background: black;
  padding: 0 0 1000px 0;
`;

const ImageContainer = styled.div``;

const OuterBox = styled.div``;

const Box = styled.div`
  border-radius: 20px;
  border: 1px solid white;
  background: black;
  height: 40px;
  wisth: auto;
  padding: 10px 50px;
`;

const Name = styled.div`
  font-family: GT Flexa;
  font-size: 24px;
  color: white;
  display: inline-block;
  float: left;
`;

const Ranking = styled.div`
  font-family: GT Flexa;
  font-size: 24px;
  color: white;
  display: inline-block;
  float: right;
`;

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    const url = `${config.apiBaseUrl}/ethMomentsLeaderboard`;
    const { data } = await axios.get(url, config.authOptions);
    let listCards = [];
    data.map((item, index) => {
      const card = renderBox(index, item.address, item.count);
      listCards.push(card);
    });
    setLeaderboard(listCards);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const renderBox = (index, wallet, count) => {
    return (
      <Box key={index}>
        <Name>
          {wallet.slice(0, 4)}....{wallet.slice(-5)}
        </Name>
        <Ranking>{count}</Ranking>
      </Box>
    );
  };

  return (
    <>
      <Container>
        <ImageContainer>
          <img src={Unfold} />
        </ImageContainer>
        <OuterBox>{leaderboard}</OuterBox>
      </Container>
    </>
  );
};

export default LeaderBoard;
