import React, { Component } from "react";
import { css } from "emotion";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Select from "./components/Select";

const filterOptions = [{ value: "All Games" }, { value: "Leage of Legends" }];

const sortOptions = [{ value: "Amount" }, { value: "Backers" }];

class App extends Component {
  state = { filterValue: filterOptions[0], sortValue: sortOptions[0] };
  render() {
    return (
      <div className="App">
        <Navbar />
        <Carousel height={375}>
          <div style={{ background: "black", height: "100%" }} />
          <div style={{ background: "blue", height: "100%" }} />
        </Carousel>
        <div
          className={css`
            min-height: 70vh;
            background: #3a3a3a;
          `}
        >
          <div style={{ padding: 15 }}>
            <div style={{ display: "inline-block", color: "white" }}>
              Filter:{" "}
              <Select
                items={filterOptions}
                setValue={filterValue => this.setState({ filterValue })}
              />
            </div>
            <div style={{ display: "inline-block", color: "white" }}>
              Sort:{" "}
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
