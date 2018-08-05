import React from "react";
import { css } from "emotion";

export default ({ children }) => (
  <div
    className={css`
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
    `}
  >
    {children}
  </div>
);
