import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import differenceInMilliseconds from "date-fns/difference_in_milliseconds";
import EditableTitle from "./EditableTitle";
import { Icon } from "./Styles";

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 1rem;
  border-bottom: 1px solid ${themeGet("colors.lightGray")};
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${themeGet("colors.veryLightGray")};
  }
`;

export default ({ tabSet, hasCurrentTab, handleSave, handleUpdate }) => {
  const [isEditing, updateIsEditing] = useState(false);

  function toggleIsEditing() {
    updateIsEditing(!isEditing);
  }

  function __handleUpdate(changed) {
    handleUpdate(tabSet.id, changed);
  }

  useEffect(() => {
    // A bit hacky: Detect if this is a new tabSet by checking whether it was created
    // less than 90 milliseconds ago.
    if (
      differenceInMilliseconds(new Date(), new Date(tabSet.createdAt)) < 120
    ) {
      toggleIsEditing();
    }
  }, [tabSet.id]);

  return (
    <ListItem onClick={() => !hasCurrentTab && handleSave(tabSet.id)}>
      <Icon name={hasCurrentTab ? "check" : "add"} mr="1rem" />
      <EditableTitle
        value={tabSet.title}
        handleUpdate={__handleUpdate}
        toggleIsEditing={toggleIsEditing}
        isEditing={isEditing}
      />
    </ListItem>
  );
};
