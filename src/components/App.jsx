import React from "react";
import { ThemeProvider } from "styled-components";
import { Box, GlobalStyles, theme } from "./Styles";

import { DataProvider } from "../redux";

import Main from "./Main";
import Sidebar from "./Sidebar";

export default () => (
  <DataProvider>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Box width="100vw" height="100vh" flexDirection="row">
          <Main />
          <Sidebar />
        </Box>
      </>
    </ThemeProvider>
  </DataProvider>
);
