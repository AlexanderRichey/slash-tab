import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";

import App from "./components/App";

Sentry.init({
  dsn: "https://96f55e2f37b6489a8d2208ed35dd1b22@sentry.io/1458506",
  release: process.env.RELEASE
});

window.addEventListener("error", e => Sentry.captureException(e));

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
