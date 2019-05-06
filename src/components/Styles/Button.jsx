import React from "react";
import styled from "styled-components";
import { space, width, height } from "styled-system";

const Button = styled.button`
  ${props => {
    if (props.varient === "primary") {
      return `
        background-color: #28a745;
        background-image: linear-gradient(-180deg,#34d058,#28a745 90%); 
        color: #fff;
      `;
    } else {
      return `
        background-color: #eff3f6;
        background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
        color: #24292e;
      `;
    }
  }}

  background-position: -1px -1px;
  background-repeat: repeat-x;
  background-size: 110% 110%;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 0.25em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  line-height: 20px;
  font-size: ${props => (props.size === "small" ? "12px" : "14px")};
  padding: ${props => (props.size === "small" ? "3px 10px" : "6px 12px")};
  position: relative;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;

  ${space}
  ${width}
  ${height}
`;

export default Button;
