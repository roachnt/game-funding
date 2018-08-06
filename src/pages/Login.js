import React from "react";
import { css } from "emotion";

import Navbar from "../components/Navbar";
import FlexContainer from "../components/FlexContainer";
import UserContext from "../components/UserContext";
import { history } from "../Router";

export default class Login extends React.Component {
  componentDidMount = () => {
    const obj = document.location.hash
      .substr(1)
      .split("&")
      .reduce((acc, str) => {
        const [key, value] = str.split("=");
        acc[key] = value;
        return acc;
      }, {});
    if (obj["access_token"]) {
      fetch("https://api.twitch.tv/helix/users", {
        headers: {
          Authorization: `Bearer ${obj["access_token"]}`
        }
      })
        .then(res => res.json())
        .then(json => {
          // TODO: Send user data to API and create user in database
          this.setUser(json.data[0]);
          history.push("/");
        });
    }
  };
  render = () => (
    <UserContext.Consumer>
      {({ user, setUser }) => {
        this.setUser = setUser;
        console.log(setUser);
        return (
          <div style={{ height: "100vh", background: "#3a3a3a" }}>
            <Navbar absolute />
            <div
              className={css`
                position: absolute;
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
                justify-content: center;
              `}
            >
              <div
                className={css`
                  width: 350px;
                  text-align: center;
                  color: black;
                  font-size: 22px;
                `}
              >
                <form
                  className={css`
                    background: white;
                    padding: 10px;
                    border-radius: 5px;
                  `}
                >
                  <div style={{ marginBottom: 15 }}>
                    <div
                      className={css`
                        text-align: left;
                        width: 80%;
                        display: inline-block;
                        margin: 0px auto;
                      `}
                    >
                      <label htmlFor="username-email">username or email</label>
                    </div>
                    <input
                      className={css`
                        width: 80%;
                        outline: none;
                        border: none;
                        font-size: 22px;
                        padding: 5px 10px;
                        border-radius: 3px;
                        border: 1px solid black;
                      `}
                      type="text"
                      name="username-email"
                    />
                  </div>
                  <div>
                    <div
                      className={css`
                        text-align: left;
                        width: 80%;
                        display: inline-block;
                        margin: 0 auto;
                      `}
                    >
                      <label htmlFor="password">password</label>
                    </div>
                    <input
                      className={css`
                        width: 80%;
                        outline: none;
                        border: none;
                        font-size: 22px;
                        padding: 5px 10px;
                        border-radius: 3px;
                        border: 1px solid black;
                      `}
                      type="text"
                      name="password"
                    />
                  </div>
                  <button
                    className={css`
                      background: #25308d;
                      outline: none;
                      border: none;
                      font-size: 20px;
                      color: white;
                      font-family: Avenir;
                      border-radius: 3px;
                      margin-top: 10px;
                      padding: 5px 10px;
                    `}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
                <a
                  style={{ textDecoration: "none" }}
                  href={`https://id.twitch.tv/oauth2/authorize?client_id=dg93br2vn212x9jmgfem7uj4lkypgo&amp;redirect_uri=${
                    window.location.origin
                  }/login&amp;scope=openid+user:read:email&amp;response_type=token+id_token`}
                >
                  <div
                    className={css`
                      width: 60%;
                      height: 45px;
                      border-radius: 5px;
                      border: 3px solid #6441a5;
                      background: white;
                      margin: 15px auto;
                    `}
                  >
                    <FlexContainer>
                      <div style={{ fontSize: 18, marginRight: 10 }}>
                        login with
                      </div>
                      <img
                        alt="Twitch"
                        src={require("../Twitch_logo.svg")}
                        width={50}
                      />
                    </FlexContainer>
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}
