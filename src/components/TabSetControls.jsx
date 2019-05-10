import React from "react";

import { Icon } from "./Styles";

export default ({ isOpen, handleDelete, toggleIsEditing, handleOpenAll }) => (
  <>
    {isOpen && (
      <>
        <Icon
          as="button"
          alt="delete"
          mr="1rem"
          name="delete_forever"
          onClick={handleDelete}
        />
        <Icon
          as="button"
          alt="edit"
          mr="1rem"
          name="edit"
          onClick={toggleIsEditing}
        />
      </>
    )}
    <Icon
      alt="reorder"
      mr="1rem"
      name="reorder"
      cursor="grab"
      data-reorder="tabset"
    />
    <Icon
      as="button"
      alt="open all"
      mr="1rem"
      name="open_in_new"
      onClick={handleOpenAll}
    />
  </>
);
