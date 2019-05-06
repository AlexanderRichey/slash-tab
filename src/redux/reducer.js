import randomWords from "random-words";

const createId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const createTabSet = (isOpen = false) => ({
  id: createId(),
  title: randomWords(4).join("-"),
  createdAt: Date.now(),
  isOpen
});

export const initialState = {
  open: [],
  saved: [],
  sets: []
};

export default function reducer(state, action) {
  switch (action.type) {
    case "RESTORE":
      return Object.assign({}, action.payload, { open: state.open });
    case "PUT_OPEN_TABS":
      return Object.assign({}, state, {
        open: state.open.concat(
          action.payload.filter(tab => tab.url !== "chrome://bookmarks/")
        )
      });
    case "UPDATE_OPEN_TAB":
      return Object.assign({}, state, {
        open: state.open.map(tab => {
          if (tab.id === action.payload.tab.id) {
            return action.payload.tab;
          } else {
            return tab;
          }
        })
      });
    case "DELETE_OPEN_TAB":
      return Object.assign({}, state, {
        open: state.open.filter(tab => tab.id !== action.payload.tabId)
      });
    case "CREATE_TABSET":
      return Object.assign({}, state, {
        sets: [createTabSet()].concat(state.sets)
      });
    case "UPDATE_TABSET":
      return Object.assign({}, state, {
        sets: state.sets.map(set => {
          if (set.id === action.payload.tabSet.id) {
            return Object.assign({}, set, action.payload.tabSet);
          } else {
            return set;
          }
        })
      });
    case "DELETE_TABSET":
      return Object.assign({}, state, {
        sets: state.sets.filter(set => set.id !== action.payload.setId),
        saved: state.saved.filter(tab => tab.setId !== action.payload.setId)
      });
    case "REORDER_TABSETS":
      return Object.assign({}, state, {
        sets: action.payload
      });
    case "SAVE_ALL_OPEN_TABS": {
      const ts = createTabSet(true);
      const tabs = state.open.map((tab, idx) =>
        Object.assign({}, tab, { setId: ts.id, id: createId(), idx })
      );
      return Object.assign({}, state, {
        sets: [ts].concat(state.sets),
        saved: state.saved.concat(tabs)
      });
    }
    case "SAVE_TO_NEW_TABSET": {
      const ts = createTabSet(true);
      // Accepts payloads including the whole tab as `tab` (to be used by the popup)
      // or the id of a currently open tab as `tabId`.
      return Object.assign({}, state, {
        sets: [ts].concat(state.sets),
        saved: state.saved.concat([
          Object.assign(
            {},
            action.payload.tab ||
              state.open.find(tab => tab.id === parseInt(action.payload.tabId)),
            {
              setId: ts.id,
              id: createId(),
              idx: 0
            }
          )
        ])
      });
    }
    case "CREATE_SAVED_TAB": {
      // Accepts payloads including the whole tab as `tab` (to be used by the popup)
      // or the id of a currently open tab as `tabId`.
      return Object.assign({}, state, {
        saved: state.saved.concat([
          Object.assign(
            {},
            action.payload.tab ||
              state.open.find(tab => tab.id === parseInt(action.payload.tabId)),
            { setId: action.payload.setId, id: createId(), idx: 10000 }
          )
        ]),
        sets: state.sets.map(set => {
          if (set.id === action.payload.setId) {
            return Object.assign({}, set, { isOpen: true });
          } else {
            return set;
          }
        })
      });
    }
    case "UPDATE_SAVED_TAB":
      return Object.assign({}, state, {
        saved: state.saved.map(tab => {
          if (tab.id === action.payload.tab.id) {
            return Object.assign({}, tab, action.payload.tab);
          } else {
            return tab;
          }
        })
      });
    case "DELETE_SAVED_TAB":
      return Object.assign({}, state, {
        saved: state.saved.filter(tab => tab.id !== action.payload.tabId)
      });
    case "REORDER_SAVED_TABS":
      return Object.assign({}, state, {
        saved: state.saved
          .filter(tab => tab.setId !== action.payload.setId)
          .concat(action.payload.tabs)
      });
    default:
      return state;
  }
}
