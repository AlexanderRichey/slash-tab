import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./Styles";
import { DataProvider } from "../redux";
import PopupMain from "./PopupMain";

export default () => (
  <DataProvider>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <PopupMain />
      </>
    </ThemeProvider>
  </DataProvider>
);
