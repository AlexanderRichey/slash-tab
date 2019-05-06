import React, { useState, useEffect } from "react";
import { SortableContainer } from "react-sortable-hoc";

import SavedTabItem from "./SavedTabItem";
import { Box } from "./Styles";

const List = SortableContainer(({ tabs }) => (
  <Box ml="2.8rem" mt="0.6rem" mb="0.4rem">
    {tabs.map((tab, idx) => (
      <SavedTabItem index={idx} key={tab.id} tab={tab} />
    ))}
  </Box>
));

export default ({ tabs, isOpen, handleReorder }) => {
  function shouldCancelStart(e) {
    return e.target.dataset.reorder !== "tab";
  }

  return (
    <Box>
      {isOpen && tabs.length > 0 && (
        <List
          tabs={tabs}
          onSortEnd={handleReorder}
          shouldCancelStart={shouldCancelStart}
        />
      )}
    </Box>
  );
};
