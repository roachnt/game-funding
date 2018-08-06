import React, { Component } from "react";
import { css } from "emotion";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Select from "../components/Select";

const filterOptions = [
  { value: "All Games" },
  { value: "Rocket League" },
  { value: "Age of Empires 2" }
];

const sortOptions = [{ value: "Amount" }, { value: "Backers" }];

class App extends Component {
  state = {
    filterValue: filterOptions[0].value,
    sortValue: sortOptions[0].value
  };
  render() {
    return (
      <div className="App">
        <Navbar />
        <Carousel height={375} switchTime={500}>
          <div style={{ background: "black", height: "100%" }} />
          <div style={{ background: "blue", height: "100%" }} />
          <div style={{ background: "red", height: "100%" }} />
        </Carousel>
        <div
          className={css`
            min-height: 70vh;
            background: #3a3a3a;
          `}
        >
          <div
            className={css`
              padding: 15px;
              @media (max-width: 768px) {
                text-align: center;
              }
            `}
          >
            <div
              className={css`
                display: inline-block;
                color: white;
                margin: 10px auto;
                @media (max-width: 768px) {
                  display: block;
                }
              `}
            >
              <div
                className={css`
                  display: inline-block;
                  margin-top: 5px;
                `}
              >
                Filter:{" "}
              </div>
              <Select
                items={filterOptions}
                setValue={filterValue => this.setState({ filterValue })}
              />
            </div>
            <div
              className={css`
                display: inline-block;
                color: white;
                margin: 10px auto;
                @media (max-width: 768px) {
                  display: block;
                }
              `}
            >
              <div
                className={css`
                  display: inline-block;
                  margin-top: 5px;
                `}
              >
                Sort:{" "}
              </div>
              <Select
                items={sortOptions}
                setValue={sortValue => this.setState({ sortValue })}
              />
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default App;
