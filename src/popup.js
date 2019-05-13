import React from "react";
import ReactDOM from "react-dom";

import Popup from "./components/Popup";

Sentry.init({
  dsn: "https://96f55e2f37b6489a8d2208ed35dd1b22@sentry.io/1458506"
});

window.addEventListener("error", e => Sentry.captureException(e));

const root = document.getElementById("root");
ReactDOM.render(<Popup />, root);
