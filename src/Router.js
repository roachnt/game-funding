import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./pages/App";
import Login from "./pages/Login";
import UserContext from "./components/UserContext";

export default class MyRouter extends React.Component {
  setUser = user => this.setState({ user });
  state = {
    user: null,
    setUser: this.setUser
  };
  render = () => (
    <Router history={history}>
      <UserContext.Provider value={this.state}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export const history = createBrowserHistory();
