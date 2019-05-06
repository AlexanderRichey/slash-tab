import React, { useState } from "react";
import styled from "styled-components";
import { Box, Text } from "./Styles";
import { encodeOpenTabDragData } from "../helpers/dragging";

const Title = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`;

export default ({ tab }) => {
  const [isDragging, setIsDragging] = useState(false);

  function handleDragStart(e) {
    e.dataTransfer.effectAllowed = "link";
    e.dataTransfer.setData("text/plain", encodeOpenTabDragData(tab));
    setIsDragging(true);
  }

  function handleDragEnd(e) {
    setIsDragging(false);
  }

  return (
    <Box
      as="li"
      flexDirection="row"
      alt={tab.title}
      mb="1rem"
      width="100%"
      alignItems="center"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      cursor={isDragging ? "grabbing" : "grab"}
    >
      <Box
        as="img"
        mr="1rem"
        height="2rem"
        width="2rem"
        display="block"
        flexShrink="0"
        src={tab.favIconUrl}
      />
      <Title alt={tab.title}>{tab.title}</Title>
    </Box>
  );
};
