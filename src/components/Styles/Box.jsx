import React from "react";
import styled from "styled-components";
import {
  space,
  color,
  width,
  height,
  overflow,
  fontSize,
  flex,
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  alignSelf,
  order,
  display
} from "styled-system";
import { backgroundColor, cursor, flexShrink, float } from "./utils";

const Box = styled.div`
  box-sizing: border-box;
  min-width: 0;
  ${backgroundColor}
  ${display}
  ${space}
  ${color}
  ${width}
  ${height}
  ${float}
  ${overflow}
  ${fontSize}
  ${flex}
  ${flexShrink}
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flexDirection}
  ${alignSelf}
  ${order}
  ${cursor}
`;

Box.defaultProps = {
  flexDirection: "column",
  display: "flex"
};

export default Box;
