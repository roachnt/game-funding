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
                  height: 400px;
                  width: 350px;
                  border-radius: 5px;
                  background: white;
                  text-align: center;
                `}
              >
                <p style={{ fontSize: 30, marginBottom: 0 }}>Login</p>
                <a
                  href={`https://id.twitch.tv/oauth2/authorize?client_id=dg93br2vn212x9jmgfem7uj4lkypgo&amp;redirect_uri=${
                    window.location.origin
                  }/login&amp;scope=openid+user:read:email&amp;response_type=token+id_token`}
                >
                  <div
                    className={css`
                      width: 80%;
                      height: 50px;
                      border-radius: 5px;
                      border: 2px solid #6441a5;
                      margin: 15px auto;
                      box-shadow: 2px 2px 5px grey;
                    `}
                  >
                    <FlexContainer>
                      <img
                        alt="Twitch"
                        src={require("../Twitch_logo.svg")}
                        width={70}
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
