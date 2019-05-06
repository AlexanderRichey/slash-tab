import React, { useContext, useState } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import { SortableElement } from "react-sortable-hoc";

import { DataContext } from "../redux";
import EditableTitle from "./EditableTitle";
import { Box, Icon, Text } from "./Styles";
import { encodeSavedTabDragData } from "../helpers/dragging";

const Controls = styled(Box)`
  visibility: hidden;
  opacity: 0;
  flex-direction: row;
  flex-shrink: 0;
`;

const Wrapper = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover ${Controls} {
    visibility: visible;
    opacity: 1;
  }
  &:hover {
    background-color: ${themeGet("colors.prettyLightGray")};
    border: 1px solid ${themeGet("colors.lightGray")};
  }
  padding: 0.3rem 1rem;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
`;

export default SortableElement(({ tab }) => {
  const { dispatch } = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);

  function handleUpdate(changed) {
    dispatch({
      type: "UPDATE_SAVED_TAB",
      payload: { tab: Object.assign(changed, { id: tab.id }) }
    });
  }

  function handleDelete(e) {
    e && e.preventDefault();
    dispatch({ type: "DELETE_SAVED_TAB", payload: { tabId: tab.id } });
  }

  // This doesn't work -- event is swallowed by react-sortable-hoc
  function handleDragStart(e) {
    e.dataTransfer.effectAllowed = "link";
    e.dataTransfer.setData("text/plain", encodeSavedTabDragData(tab));
  }

  function toggleIsEditing(e) {
    e && e.preventDefault() && e.stopPropagation();
    setIsEditing(!isEditing);
  }

  return (
    <Wrapper href={tab.url} target="_blank">
      <Box flexDirection="row" alignItems="center">
        <Box>
          <Box
            as="img"
            src={tab.favIconUrl}
            mr="1rem"
            height="1.8rem"
            width="1.8rem"
            flexShrink="0"
          />
        </Box>
        <Box flexDirection="column" flexShrink="10">
          <EditableTitle
            value={tab.title}
            handleUpdate={handleUpdate}
            toggleIsEditing={toggleIsEditing}
            isEditing={isEditing}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            width="100%"
          />
          <Text
            fontSize="10px"
            color="#7d7d7d"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
            width="100%"
          >
            {tab.url}
          </Text>
        </Box>
      </Box>

      <Controls>
        <Icon
          as="button"
          alt="delete"
          ml="0.6rem"
          onClick={handleDelete}
          name="delete_forever"
        />
        <Icon
          as="button"
          alt="edit"
          ml="0.6rem"
          name="edit"
          onClick={toggleIsEditing}
        />
        <Icon
          alt="reorder"
          ml="0.6rem"
          name="reorder"
          cursor="grab"
          onDragStart={handleDragStart}
          draggable="true"
          data-reorder="tab"
        />
        <Icon as="button" alt="open" ml="0.6rem" name="open_in_new" />
      </Controls>
    </Wrapper>
  );
});
