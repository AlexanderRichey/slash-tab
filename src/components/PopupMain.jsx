import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import { DataContext } from "../redux";
import PopupTabSetItem from "./PopupTabSetItem";
import { Box, Text, Icon, Button } from "./Styles";

const ButtonContainer = styled.div`
  padding: 1rem;
  height: 4rem;
  border-bottom: 1px solid ${themeGet("colors.lightGray")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${themeGet("colors.white")};
  flex-direction: row;
  display: flex;
`;

const IntroText = () => (
  <Box width="100%" height="100%" alignItems="center" justifyContent="center">
    <Box width="20rem">
      <Text textAlign="center" fontSize={1} fontWeight="500">
        Save the current tab to a new group or click{" "}
        <Icon
          name="open_in_new"
          fontSize="20px"
          display="inline"
          ml="0rem"
          style={{ verticalAlign: "bottom" }}
        />{" "}
        to manage all your tabs.
      </Text>
    </Box>
  </Box>
);

export default () => {
  const { tabs, dispatch } = useContext(DataContext);
  const [currentTab, setCurrentTab] = useState({});

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      setCurrentTab(tabs[0]);
    });
  }, []);

  function handleSaveTabToSet(setId) {
    dispatch({
      type: "CREATE_SAVED_TAB",
      payload: {
        setId,
        tab: currentTab
      }
    });
  }

  function handleUpdateTabSet(setId, changed) {
    dispatch({
      type: "UPDATE_TABSET",
      payload: { tabSet: Object.assign(changed, { id: setId }) }
    });
  }

  function handleSaveToNewTabSet() {
    dispatch({
      type: "SAVE_TO_NEW_TABSET",
      payload: { tab: currentTab }
    });
  }

  function handleOpenBookmarks() {
    chrome.tabs.create({ url: "app.html" });
  }

  return (
    <Box width="26rem" height="30rem" overflow="scroll">
      <ButtonContainer>
        <Button
          width="calc(80% - 2rem)"
          onClick={handleSaveToNewTabSet}
          varient="primary"
        >
          <Icon name="playlist_add" mr="1rem" />
          <Text>Save to new group</Text>
        </Button>
        <Button
          width="calc(20% - 1rem)"
          ml="1rem"
          onClick={handleOpenBookmarks}
        >
          <Icon ml="0rem" name="open_in_new" />
        </Button>
      </ButtonContainer>
      <Box height="6rem" flexShrink="0" />
      {tabs.sets.length <= 0 && <IntroText />}
      <ol>
        {tabs.sets.map(tabSet => (
          <PopupTabSetItem
            key={tabSet.id}
            tabSet={tabSet}
            hasCurrentTab={tabs.saved.some(
              tab => tab.setId === tabSet.id && tab.url === currentTab.url
            )}
            handleSave={handleSaveTabToSet}
            handleUpdate={handleUpdateTabSet}
          />
        ))}
      </ol>
    </Box>
  );
};
