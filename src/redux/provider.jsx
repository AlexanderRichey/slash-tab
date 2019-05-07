import React, { useReducer, useEffect, useRef } from "react";
import omit from "lodash/omit";
import DataContext from "./context";
import reducer, { initialState } from "./reducer";

export default function DataProvider({ children }) {
  const [tabs, dispatch] = useReducer(reducer, initialState);
  const didRestore = useRef(false);

  // Load data on startup
  useEffect(() => {
    chrome.storage.local.get(["redux"], result => {
      let restored;
      if (!result.redux) {
        didRestore.current = true;
        return;
      }

      try {
        restored = JSON.parse(result.redux);
      } catch (e) {
        console.warn(e);
      }

      if (restored && restored.saved && restored.sets) {
        dispatch({
          type: "RESTORE",
          payload: restored
        });
      }

      didRestore.current = true;
    });
  }, []);

  // Save data every time a redux action is dispatched
  useEffect(() => {
    if (didRestore.current) {
      new Promise(() =>
        chrome.storage.local.set(
          { redux: JSON.stringify(omit(tabs, ["open"])) },
          () => {}
        )
      );
    }
  }, [tabs.saved, tabs.sets]);

  // When the window does not have focus, listen for changes to storage
  // made by the popup and restore from storage to keep up to date
  useEffect(() => {
    function otherWindowListener(changes, areaName) {
      if (!document.hasFocus() && areaName === "local" && didRestore) {
        let restored;

        try {
          restored = JSON.parse(changes.redux.newValue);
        } catch (e) {
          return console.error(e);
        }

        dispatch({
          type: "RESTORE",
          payload: restored
        });
      }
    }

    chrome.storage.onChanged.addListener(otherWindowListener);

    return () => chrome.storage.onChanged.removeListener(otherWindowListener);
  }, []);

  return (
    <DataContext.Provider value={{ tabs, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
