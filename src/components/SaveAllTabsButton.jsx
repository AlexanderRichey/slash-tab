import React, { useContext } from "react";
import { DataContext } from "../redux"
import { Button } from "./Styles";

export default () => {
  const { dispatch } = useContext(DataContext);

  function handleSaveAllTabs() {
    dispatch({ type: "SAVE_ALL_OPEN_TABS" });
  }

  return (
    <Button size="small" onClick={handleSaveAllTabs}>
      Save All
    </Button>
  );
};
