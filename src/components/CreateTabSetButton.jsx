import React, { useContext } from "react";
import { DataContext } from "../redux";
import { Button, Icon, Text } from "./Styles";

export default () => {
  const { dispatch } = useContext(DataContext);

  function handleClick() {
    dispatch({ type: "CREATE_TABSET" });
  }

  return (
    <Button varient="primary" onClick={handleClick}>
      <Icon name="playlist_add" mr="0.5rem" ml="0rem" />
      <Text>New Group</Text>
    </Button>
  );
};
