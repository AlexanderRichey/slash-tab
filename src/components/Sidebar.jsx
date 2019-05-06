import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import OpenTabsList from "./OpenTabList";
import SaveAllTabsButton from "./SaveAllTabsButton";
import { Box, Text } from "./Styles";

const Container = styled.div`
  width: 21rem;
  height: 100vh;
  padding: 1.6rem 2rem 2rem 2rem;
  background-color: ${themeGet("colors.blueBg")};
  position: fixed;
  top: 0;
  right: 0;
  border-left: 1px solid #e1e4e8;
  overflow-y: scroll;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: fixed;
  right: 0;
  top: 0;
  width: 21rem;
  padding: 1.6rem 2rem 3rem 2rem;
  background-image: linear-gradient(
    ${themeGet("colors.blueBg")} 75%,
    rgba(0, 0, 0, 0)
  );
`;

const Slug = styled.div`
  height: 5rem;
  flex-shrink: 0;
`;

const Header = () => (
  <HeaderContainer>
    <Text as="h3" fontWeight="bold">
      Open Tabs
    </Text>
    <SaveAllTabsButton />
  </HeaderContainer>
);

export default () => (
  <Container>
    <Header />
    <Slug />
    <OpenTabsList />
    <Slug />
  </Container>
);
