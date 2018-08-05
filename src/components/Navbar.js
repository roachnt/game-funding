import React from "react";
import { css } from "emotion";
import FlexContainer from "./FlexContainer";
export default () => (
  <div
    className={css`
      height: 60px;
      width: 100vw;
      background: #25308d;
    `}
  >
    <div
      className={css`
        width: 50%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
      `}
    />
    <div
      className={css`
        width: 50%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        text-align: right;
      `}
    >
      <Login />
      <SignUp />
    </div>
  </div>
);

const Login = () => (
  <a href="https://id.twitch.tv/oauth2/authorize?client_id=dg93br2vn212x9jmgfem7uj4lkypgo&amp;redirect_uri=http://localhost:3000&amp;scope=openid+user:read:email&amp;response_type=token+id_token">
    <div
      className={css`
        display: inline-block;
        color: white;
        height: 100%;
        margin: 0 10px;
        cursor: pointer;
      `}
    >
      <FlexContainer>Login</FlexContainer>
    </div>
  </a>
);

const SignUp = () => (
  <div
    className={css`
      display: inline-block;
      color: white;
      height: 100%;
      margin: 0 30px 0 10px;
      cursor: pointer;
    `}
  >
    <FlexContainer>Sign Up</FlexContainer>
  </div>
);
