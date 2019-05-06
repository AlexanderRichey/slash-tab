import React from "react";
import styled from "styled-components";
import {
  space,
  color,
  width,
  height,
  fontSize,
  flex,
  alignSelf
} from "styled-system";
import { cursor, float } from "./utils";

const Icon = styled.i`
  display: flex;
  ${flex}
  ${space}
  ${color}
  ${width}
  ${height}
  ${fontSize}
  ${alignSelf}
  ${cursor}
  ${float}
  border: 0;
  background-color: transparent;
  &:hover {
    color: #7d7d7d;
  }
  transition: all ease 0.2s;
`;

Icon.defaultProps = {
  flexDirection: "column",
  className: "material-icons",
  cursor: "pointer",
  padding: 0
};

export default props => {
  const { name, ...rest } = props;
  return (
    <Icon ml="-0.4rem" {...rest}>
      {name}
    </Icon>
  );
};
