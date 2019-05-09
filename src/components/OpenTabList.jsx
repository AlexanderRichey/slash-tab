import React, { useContext, useEffect } from "react";
import pick from "lodash/pick";
import { DataContext } from "../redux";
import OpenTabItem from "./OpenTabItem";

const TAB_FIELDS = ["id", "title", "url", "favIconUrl"];

export default () => {
  const { tabs, dispatch } = useContext(DataContext);

  // Get the tabs when the component mounts
  useEffect(() => {
    chrome.tabs.query({}, tabs => {
      dispatch({
        type: "PUT_OPEN_TABS",
        payload: tabs.map(tab => pick(tab, TAB_FIELDS))
      });
    });
  }, []);

  // Watch for changes among tabs
  useEffect(() => {
    function handleTabCreation(tab) {
      dispatch({
        type: "PUT_OPEN_TABS",
        payload: [pick(tab, TAB_FIELDS)]
      });
    }

    function handleTabDeletion(tabId) {
      dispatch({ type: "DELETE_OPEN_TAB", payload: { tabId } });
    }

    function handleTabUpdate(tabId, changeInfo, tab) {
      dispatch({
        type: "UPDATE_OPEN_TAB",
        payload: { tab: pick(tab, TAB_FIELDS) }
      });
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
