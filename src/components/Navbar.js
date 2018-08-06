import React from "react";
import { css } from "emotion";
import { Link } from "react-router-dom";

import FlexContainer from "./FlexContainer";
import UserContext from "./UserContext";
export default ({ absolute }) => (
  <UserContext.Consumer>
    {({ user, setUser }) => (
      <div
        className={css`
          z-index: 1;
          height: 60px;
          width: 100vw;
          background: #25308d;
          ${absolute &&
            css`
              position: absolute;
            `};
          @media (max-width: 768px) {
            text-align: center;
          }
        `}
      >
        <div
          className={css`
            width: 50%;
            height: 100%;
            display: inline-block;
            vertical-align: top;
            @media (max-width: 768px) {
              width: auto;
            }
          `}
        >
          <Link to="/" style={{ color: "white" }}>
            <div
              className={css`
                height: 100%;
                display: inline-block;
                margin: 0 10px;
              `}
            >
              <FlexContainer>home</FlexContainer>
            </div>
          </Link>
        </div>
        <div
          className={css`
            width: 50%;
            height: 100%;
            display: inline-block;
            vertical-align: top;
            text-align: right;

            @media (max-width: 768px) {
              width: auto;
            }
          `}
        >
          {user ? (
            <React.Fragment>
              <div
                className={css`
                  width: 40px;
                  height: 100%;
                  display: inline-block;
                `}
              >
                <FlexContainer>
                  <img src={user.profile_image_url} height={30} />
                </FlexContainer>
              </div>
              <User>{user.display_name}</User>
              <Logout onClick={() => setUser(null)} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Login />
              <SignUp />
            </React.Fragment>
          )}
        </div>
      </div>
    )}
  </UserContext.Consumer>
);

const User = ({ children }) => (
  <div
    className={css`
      height: 100%;
      margin: 0 10px;
      cursor: pointer;
      color: white;
      display: inline-block;
      vertical-align: top;
      @media (max-width: 768px) {
        display: none;
      }
    `}
  >
    <FlexContainer>{children}</FlexContainer>
  </div>
);

const Logout = ({ onClick }) => (
  <div
    className={css`
      display: inline-block;
      color: white;
      height: 100%;
      margin: 0 10px;
      cursor: pointer;
      vertical-align: top;
    `}
    onClick={onClick}
  >
    <FlexContainer>logout</FlexContainer>
  </div>
);

const Login = () => (
  <Link to="/login">
    <div
      className={css`
        display: inline-block;
        color: white;
        height: 100%;
        margin: 0 10px;
        cursor: pointer;
      `}
    >
      <FlexContainer>login</FlexContainer>
    </div>
  </Link>
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
    <FlexContainer>sign up</FlexContainer>
  </div>
);
