import React from 'react';
import Unfold from "../../assets/Unfold.svg";
import styled from 'styled-components';


const Container = styled.div`
background:black;
padding: 0 0 1000px 0;
`

const ImageContainer = styled.div``

const OuterBox = styled.div`

`

const Box = styled.div`
border-radius:20px;
border: 1px solid white;
background:black;
height:40px;
wisth:auto;
padding: 10px 50px;
`

const Name = styled.div`
font-family:GT Flexa;
font-size:24px;
color:white;
display:inline-block;
float:left;
`

const Ranking = styled.div`
font-family:GT Flexa;
font-size:24px;
color:white;
display:inline-block;
float:right;
`

const LeaderBoard = () => {
  return (
    <>
    <Container>
        <ImageContainer>
            <img src={Unfold} />
        </ImageContainer>
        <OuterBox>
            <Box>
                <Ranking>1</Ranking>
                <Name>Banati.eth</Name>
                <Ranking>2</Ranking>
            </Box>
        </OuterBox>
    </Container>
    
    </>
  )
}

export default LeaderBoard