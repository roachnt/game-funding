import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "emotion";
import Router from "./Router";

injectGlobal`
body,html, #root {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: Avenir;
}
`;

ReactDOM.render(<Router />, document.getElementById("root"));
registerServiceWorker();
