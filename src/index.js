import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "emotion";

injectGlobal`
body,html, #root {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-family: Avenir;
}
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
