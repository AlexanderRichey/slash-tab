import React from "react";
import styled from "styled-components";
import { space, color, fontSize, fontWeight, overflow } from "styled-system";
import { whiteSpace, textOverflow, textAlign } from "./utils";

const Text = styled.span`
  ${fontSize}
  ${fontWeight}
  ${color}
  ${space}
  ${whiteSpace}
  ${textOverflow}
  ${overflow}
  ${textAlign}
`;

export default Text;
