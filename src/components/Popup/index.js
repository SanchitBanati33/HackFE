import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";

const Title = styled.div`
font-family: 'GT Flexa';
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 36px;
/* or 112% */

text-align: center;

/* Black */

color: #2B2B2B;

`

const Box = styled.div``

const Popups = () => {
  return (
    <>
      <Popup
        trigger={<button className="button"> Open Modal </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"><Title> Confirm the address before you mint </Title> </div>
            <div className="content">
            </div>
            {/* <div className="actions">
              <button
                className="button"
                onClick={() => {
                  console.log("modal closed ");
                  close();
                }}
              >
              </button>
            </div> */}
          </div>
        )}
      </Popup>
    </>
  );
};

export default Popups;
