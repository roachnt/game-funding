import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./pages/App";
import Login from "./pages/Login";
import UserContext from "./components/UserContext";
import AccessTokenContext from "./components/AccessTokenContext";

export default class MyRouter extends React.Component {
  setUser = user => this.setState({ user });
  setAccessToken = accessToken => this.setState({ accessToken });
  state = {
    user: null,
    setUser: this.setUser,
    accessToken: null,
    setAccessToken: this.setAccessToken
  };
  render = () => (
    <Router history={history}>
      <UserContext.Provider
        value={{ user: this.state.user, setUser: this.state.setUser }}
      >
        <AccessTokenContext.Provider
          value={{
            accessToken: this.state.accessToken,
            setAccessToken: this.state.setAccessToken
          }}
        >
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </AccessTokenContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export const history = createBrowserHistory();
