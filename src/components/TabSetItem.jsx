import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import differenceInMilliseconds from "date-fns/difference_in_milliseconds";
import { SortableElement } from "react-sortable-hoc";
import sortBy from "lodash/sortBy";

import EditableTitle from "./EditableTitle";
import Controls from "./TabSetControls";
import SavedTabList from "./SavedTabList";
import FaviconList from "./FaviconList";
import { DataContext } from "../redux";
import { Box, Text, Icon, theme } from "./Styles";
import { decodeDragData, reorder } from "../helpers/dragging";

const ListItem = styled.li`
  ${props => {
    if (props.closed) {
      return `
        list-style: none;
        padding: 0;
        margin: 0;
        height: 0;
        border: 0;
      `;
    } else {
      return `
        list-style: none;
        padding: 1rem 2rem;
        border-bottom: 1px solid #e1e4e8;
        transition: all 0.2s ease;
        cursor: pointer;
        background-color: ${
          props.isHoverOver ? "lightyellow" : props.theme.colors.white
        };
        &:hover {
          background-color: ${props.theme.colors.veryLightGray}};
        }`;
    }
  }}
`;

export default SortableElement(({ tabSet }) => {
  const timeout = useRef(null);
  const { tabs, dispatch } = useContext(DataContext);
  const [isHoverOver, setIsHoverOver] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filteredTabs = sortBy(
    tabs.saved.filter(tab => {
      if (tab.setId === tabSet.id) {
        if (tabs.query.length > 0) {
          // Handle search
          return tab.title
            .concat(tab.url)
            .toLowerCase()
            .includes(tabs.query);
        } else {
          return true;
        }
      }
    }),
    ["idx"]
  );
  const tabsCount = filteredTabs.length;

  function handleDragOver(e) {
    e.preventDefault();

    if (e.dataTransfer.effectAllowed === "link") {
      e.dataTransfer.dropEffect = "link";
      setIsHoverOver(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setIsHoverOver(false), 100);
    }
  }

  function handleDrop(e) {
    e.preventDefault();

    const [type, id] = decodeDragData(e.dataTransfer.getData("text/plain"));

    if (type === "opentab") {
      dispatch({
        type: "CREATE_SAVED_TAB",
        payload: {
          setId: tabSet.id,
          tabId: id
        }
      });
    }

    setIsHoverOver(false);
  }

  function handleUpdate(changed) {
    dispatch({
      type: "UPDATE_TABSET",
      payload: { tabSet: Object.assign(changed, { id: tabSet.id }) }
    });
  }

  function handleDelete() {
    dispatch({ type: "DELETE_TABSET", payload: { setId: tabSet.id } });
  }

  function handleReorder({ oldIndex, newIndex }) {
    dispatch({
      type: "REORDER_SAVED_TABS",
      payload: {
        tabs: reorder(filteredTabs, oldIndex, newIndex).map((tab, idx) =>
          Object.assign(tab, { idx })
        ),
        setId: tabSet.id
      }
    });
  }

  function handleOpenAll(e) {
    e && e.stopPropagation();
    filteredTabs.forEach(tab => chrome.tabs.create({ url: tab.url }));
  }

  function toggleIsOpen() {
    dispatch({
      type: "UPDATE_TABSET",
      payload: {
        tabSet: {
          id: tabSet.id,
          isOpen: !tabSet.isOpen
        }
      }
    });
  }

  function toggleIsEditing(e) {
    e && e.stopPropagation();
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    // A bit hacky: Detect if this is a new tabSet by checking whether it was created
    // less than 90 milliseconds ago.
    if (
      differenceInMilliseconds(new Date(), new Date(tabSet.createdAt)) < 150
    ) {
      toggleIsEditing();
    }
  }, []);

  if (!tabsCount && tabs.query.length > 0) return <ListItem closed />;

  return (
    <ListItem
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      isHoverOver={isHoverOver}
    >
      <Box
        onClick={toggleIsOpen}
        flexDirection="row"
        justifyContent="space-between"
        height="2.4rem"
        alignItems="center"
      >
        <Box display="block" flexDirection="row" alignItems="baseline">
          <Icon
            as="button"
            float="left"
            mr="0.5rem"
            name="keyboard_arrow_up"
            style={{
              transform: tabSet.isOpen ? "rotate(180deg)" : "rotate(0deg)"
            }}
          />
          <EditableTitle
            fontSize="16px"
            fontWeight="500"
            value={tabSet.title}
            handleUpdate={handleUpdate}
            toggleIsEditing={toggleIsEditing}
            isEditing={isEditing}
          />
          <Text color={theme.colors.darkGray} fontSize="12px" ml="1rem">
            {distanceInWordsToNow(new Date(tabSet.createdAt))} ago
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <FaviconList tabs={filteredTabs} />
          <Box width="8rem">
            <Text
              mr="1rem"
              color={theme.colors.darkGray}
              fontSize="12px"
              textAlign="center"
            >
              {tabsCount} {tabsCount === 1 ? "Tab" : "Tabs"}
            </Text>
          </Box>
          <Controls
            isOpen={tabSet.isOpen}
            handleOpenAll={handleOpenAll}
            toggleIsEditing={toggleIsEditing}
            handleDelete={handleDelete}
          />
        </Box>
      </Box>
      <SavedTabList
        isOpen={tabs.query.length ? true : tabSet.isOpen}
        tabs={filteredTabs}
        handleReorder={handleReorder}
      />
    </ListItem>
  );
});
