import styled from "styled-components";

export const RedeemOut = styled.div`
  width: 156.7px;
  height: 50px;
  border-radius: 50%;
  border: 0.8px solid #354b37;
  transform: rotate(-3.12deg);
  margin: auto;

  &:hover {
    transform: rotate(+3.12deg);
  }

  @media (max-width: 800px) {
    width: 156.7px;
    height: 50px;
    margin: 10px auto;
  }
`;

export const Redeem = styled.button`
  text-decoration: none;
  border: none;
  background: #354b37;
  height: 48px;
  width: 158px;
  border-radius: 50%;
  top: calc(50% - 20px / 2 - 2.5px);
  font-family: "Dahlia";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  background: #354b37;
  line-height: 20px;
  color: #f8f9fa;
  transform: rotate(+3.12deg);

  &:hover {
    transform: rotate(-3.12deg);
    background: transparent;
    border: none;
    color: #354b37;
  }

  @media (max-width: 800px) {
  }
`;

export const Title = styled.div`
  font-family: "Dahlia";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  /* identical to box height, or 100% */

  align-items: center;
  text-align: center;

  /* Green Leaf */

  color: #354b37;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 24px 0px;

  @media (max-width: 800px) {
    padding: 0;
    margin: 30px 0 0 0;
  }
`;

export const Description = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  padding: 0 16%;
  line-height: 20px;
  /* or 125% */

  text-align: center;

  /* Green Leaf */

  color: #354b37;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 24px 0px;

  @media (max-width: 800px) {
    width: 295px;
    height: 40px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #354b37;
    padding: 0 0 25px 0;
    margin: 24px 0 0 24px;
  }
`;
