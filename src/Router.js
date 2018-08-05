import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./pages/App";

export default () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

export const history = createBrowserHistory();
