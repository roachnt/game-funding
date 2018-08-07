import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./pages/App";
import Login from "./pages/Login";
import UserContext from "./components/UserContext";
import Match from "./pages/Match";

export default class MyRouter extends React.Component {
  setUser = user => this.setState({ user });
  setAccessToken = accessToken => this.setState({ accessToken });
  state = {
    user: null,
    setUser: this.setUser
  };
  render = () => (
    <Router history={history}>
      <UserContext.Provider
        value={{ user: this.state.user, setUser: this.state.setUser }}
      >
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/matches/:matchId" component={Match} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export const history = createBrowserHistory();
