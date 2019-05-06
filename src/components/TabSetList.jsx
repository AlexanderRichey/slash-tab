import React, { useContext } from "react";
import { SortableContainer } from "react-sortable-hoc";

import { DataContext } from "../redux";
import TabSetItem from "./TabSetItem";
import { reorder } from "../helpers/dragging";

const List = SortableContainer(({ tabSets }) => (
  <ol>
    {tabSets.map((tabSet, idx) => (
      <TabSetItem key={tabSet.id} index={idx} tabSet={tabSet} />
    ))}
  </ol>
));

export default () => {
  const { tabs, dispatch } = useContext(DataContext);
  const tabSets = tabs.sets;

  function handleSortEnd({ oldIndex, newIndex }) {
    dispatch({
      type: "REORDER_TABSETS",
      payload: reorder(tabSets, oldIndex, newIndex)
    });
  }

  function shouldCancelStart(e) {
    return e.target.dataset.reorder !== "tabset";
  }

  return (
    <List
      tabSets={tabSets}
      onSortEnd={handleSortEnd}
      shouldCancelStart={shouldCancelStart}
    />
  );
};
