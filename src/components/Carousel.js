import React from "react";
import { css } from "emotion";

export default class Carousel extends React.Component {
  state = { position: 0 };
  slide = position => this.setState({ position });
  componentDidMount = () => {
    // setInterval();
  };
  render = () => (
    <div
      style={{
        height: this.props.height,
        overflowX: "hidden",
        whiteSpace: "nowrap",
        position: "relative"
      }}
    >
      <div
        className={css`
          position: absolute;
          z-index: 1;
          text-align: center;
          right: 0;
          left: 0;
          bottom: 5px;
        `}
      >
        {this.props.children.map((child, i) => (
          <div
            onClick={() => this.slide(i)}
            className={css`
              margin: 0 3px;
              display: inline-block;
              cursor: pointer;
              height: 15px;
              width: 15px;
              border-radius: 50%;
              background: ${this.state.position === i ? "#25308d" : "white"};
            `}
          />
        ))}
      </div>
      <div
        style={{
          height: "100%",
          transition: `${this.props.switchTime}ms` || "1000ms",
          transform: `translateX(-${this.state.position * 100}vw)`
        }}
      >
        {this.props.children.map((child, i) => (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "inline-block",
              verticalAlign: "top"
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
