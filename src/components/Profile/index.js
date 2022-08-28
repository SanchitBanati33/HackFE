import React from 'react';
import styled from 'styled-components';
import Unfold from "../../assets/Unfold.svg";

const Container = styled.div`
background:black;
padding: 0 0 1000px 0;
`

const Box = styled.div`
border:1px solid white;
border-radius:20px;
height:50px;
gap:20px;
margin: 30px;
`

const Detail = styled.div`
font-family:GT Flexa;
fontsize:18px;
color:white;
margin: 10px 0 0 0;
`


const Profile = () => {
  return (
    <>
    <Container>
        <img src={Unfold} />
        <Box>
            <Detail>Social Cause : Gitcoin Grants</Detail>
        </Box>

        <Box>
            <Detail>
                Creator Earning : $10
            </Detail>
        </Box>

        <Box>
            <Detail>
                Social Impact generated : $2
            </Detail>
        </Box>

        <Box>
            <Detail>
                Total Moments Created: 33
            </Detail>
        </Box>

        <Box>
            <Detail>
                Total Moments Tagged : 1
            </Detail>
        </Box>
    </Container>
    </>

  )
}

export default Profile