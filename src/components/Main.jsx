import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";

import { DataContext } from "../redux";
import TabSetList from "./TabSetList";
import Header from "./Header";
import { Box, Text, Icon } from "./Styles";
import { decodeDragData } from "../helpers/dragging";

const Container = styled(Box)`
  width: calc(100vw - 25rem);
  height: 100vh;
  background-color: ${props => (props.isHoverOver ? "lightyellow" : "inherit")};
`;

export default () => {
  const { tabs, dispatch } = useContext(DataContext);
  const timeout = useRef(null);
  const [isHoverOver, setIsHoverOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();

    if (e.target.dataset.drag !== "tabsets-container") {
      return;
    }

    if (e.dataTransfer.effectAllowed === "link") {
      e.dataTransfer.dropEffect = "link";
      setIsHoverOver(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setIsHoverOver(false), 100);
    }
  }

  function handleDrop(e) {
    e.preventDefault();

    if (e.target.dataset.drag !== "tabsets-container") {
      return;
    }

    const [type, id] = decodeDragData(e.dataTransfer.getData("text/plain"));

    if (type === "opentab") {
      dispatch({
        type: "SAVE_TO_NEW_TABSET",
        payload: {
          tabId: id
        }
      });
    }

    setIsHoverOver(false);
  }

  return (
    <Container
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      isHoverOver={isHoverOver}
      data-drag="tabsets-container"
    >
      <Header />
      {tabs.sets.length ? (
        <TabSetList />
      ) : (
        <Box
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          data-drag="tabsets-container"
        >
          <Box width="25rem" pb="4rem" alignItems="center">
            <Icon name="tab" fontSize="45px" mb="1rem" />
            <Text textAlign="center" fontSize={2} fontWeight="500">
              Drag and drop tabs from the sidebar to get started.
            </Text>
          </Box>
        </Box>
      )}
    </Container>
  );
};
