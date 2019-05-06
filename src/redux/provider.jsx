import React, { useReducer, useEffect, useRef } from "react";
import omit from "lodash/omit";
import DataContext from "./context";
import reducer, { initialState } from "./reducer";

export default function DataProvider({ children }) {
  const [tabs, dispatch] = useReducer(reducer, initialState);
  const didRestore = useRef(false);

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

  useEffect(() => {
    if (didRestore.current) {
      new Promise(resolve =>
        chrome.storage.local.set(
          { redux: JSON.stringify(omit(tabs, ["open"])) },
          () => console.log("saved")
        )
      );
    }
  }, [tabs]);

  return (
    <DataContext.Provider value={{ tabs, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
