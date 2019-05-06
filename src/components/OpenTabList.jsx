import React, { useContext, useEffect } from "react";
import { DataContext } from "../redux";
import OpenTabItem from "./OpenTabItem";

export default () => {
  const { tabs, dispatch } = useContext(DataContext);

  // Get the tabs when the component mounts
  useEffect(() => {
    chrome.tabs.query({ currentWindow: true }, tabs => {
      dispatch({ type: "PUT_OPEN_TABS", payload: tabs });
    });
  }, []);

  // Watch for changes among tabs
  useEffect(() => {
    function handleTabCreation(tab) {
      dispatch({ type: "PUT_OPEN_TABS", payload: [tab] });
    }

    function handleTabDeletion(tabId) {
      dispatch({ type: "DELETE_OPEN_TAB", payload: { tabId } });
    }

    function handleTabUpdate(tabId, changeInfo, tab) {
      dispatch({ type: "UPDATE_OPEN_TAB", payload: { tab } });
    }

    chrome.tabs.onCreated.addListener(handleTabCreation);
    chrome.tabs.onRemoved.addListener(handleTabDeletion);
    chrome.tabs.onUpdated.addListener(handleTabUpdate);

    return () => {
      chrome.tabs.onCreated.removeListener(handleTabCreation);
      chrome.tabs.onRemoved.removeListener(handleTabDeletion);
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
    };
  });

  return (
    <ol>
      {tabs.open.map(tab => (
        <OpenTabItem key={tab.id} tab={tab} />
      ))}
    </ol>
  );
};
