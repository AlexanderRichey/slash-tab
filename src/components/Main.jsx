import React, { useContext, useState, useRef } from "react";
import styled from "styled-components";

import { DataContext } from "../redux";
import TabSetList from "./TabSetList";
import Header from "./Header";
import { Box } from "./Styles";
import { decodeDragData } from "../helpers/dragging";

const Container = styled(Box)`
  width: calc(100vw - 25rem);
  height: 100vh;
  background-color: ${props => (props.isHoverOver ? "lightyellow" : "inherit")};
`;

export default () => {
  const { dispatch } = useContext(DataContext);
  const timeout = useRef(null);
  const [isHoverOver, setIsHoverOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();

    if (e.target.id !== "tabsets-continaer") {
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

    if (e.target.id !== "tabsets-continaer") {
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
      id="tabsets-continaer"
    >
      <Header />
      <TabSetList />
    </Container>
  );
};
