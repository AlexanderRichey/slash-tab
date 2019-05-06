import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import CreateTabSetButton from "./CreateTabSetButton";
import { Box, Text } from "./Styles";

const Wrap = styled(Box)`
  font-size: 14px;
  line-height: 1.5;
  padding: 1rem 2rem;
  z-index: 32;
  border-bottom: 1px solid #e1e4e8;
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 25.1rem);
  height: 59px;
  background-color: ${themeGet("colors.white")};
`;

const AppName = () => (
  <Text fontWeight="bold" fontSize="16px">
    \t
  </Text>
);

export default () => (
  <>
    <Wrap
      as="header"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <AppName />
      <CreateTabSetButton />
    </Wrap>
    <Box height="59px" width="100%" flexShrink="0" />
  </>
);
