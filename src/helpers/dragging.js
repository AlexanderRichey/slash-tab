export function decodeDragData(str) {
  const split = str.split("-");
  return [split[0], split[1]];
}

export function encodeOpenTabDragData(tab) {
  return `opentab-${tab.id}`;
}

export function encodeTabSetDragData(ts) {
  return `tabset-${ts.id}`;
}

export function encodeSavedTabDragData(st) {
  return `tabset-${st.id}`;
}

export function reorder(all, from, to) {
  const newArray = all.slice();
  const startIdx = to < 0 ? newArray.length + to : to;
  newArray.splice(startIdx, 0, newArray.splice(from, 1)[0]);
  return newArray;
}
