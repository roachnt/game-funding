import React, { Component } from "react";
import { css } from "emotion";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Select from "../components/Select";
import { getMatchesAndFormat } from "../helpers/apiHelper";
import { getUserClips } from "../helpers/twitchHelper";

const filterOptions = [
  { value: "all games" },
  { value: "Rocket League" },
  { value: "Age of Empires 2" }
];

const sortOptions = [{ value: "amount" }, { value: "backers" }];

class App extends Component {
  state = {
    filterValue: filterOptions[0].value,
    sortValue: sortOptions[0].value,
    matches: null
  };
  componentWillMount = async () => {
    const matches = await getMatchesAndFormat();
    this.setState({ matches });
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
        <div className={matchesContainerStyle}>
          <div className={filterAndSortContainerStyle}>
            <div className={selectContainerStyle}>
              <div className={selectLabelStyle}>filter: </div>
              <Select
                items={filterOptions}
                setValue={filterValue => this.setState({ filterValue })}
              />
            </div>
            <div className={selectContainerStyle}>
              <div className={selectLabelStyle}>sort: </div>
              <Select
                items={sortOptions}
                setValue={sortValue => this.setState({ sortValue })}
              />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            {this.state.matches &&
              this.state.matches
                .filter(
                  match =>
                    match.game.title === this.state.filterValue ||
                    this.state.filterValue === "all games"
                )
                .map(match => (
                  <div
                    className={css`
                      display: inline-block;
                      width: 50%;
                      vertical-align: top;
                      box-sizing: border-box;
                    `}
                  >
                    <div
                      className={css`
                        width: 95%;
                        height: 250px;
                        background: #25308d;
                        color: white;
                        margin: 0 auto;
                        padding: 20px;
                        box-sizing: border-box;
                        border-radius: 5px;
                      `}
                    >
                      <div
                        className={css`
                          display: inline-block;
                          width: 33.33333%;
                          height: 100%;
                          vertical-align: top;
                        `}
                      >
                        {match.team1.length === 1 && (
                          <React.Fragment>
                            <div style={{ marginBottom: 10, fontSize: 30 }}>
                              {match.team1[0].display_name}
                            </div>
                            <PlayerCard player={match.team1[0]} />
                          </React.Fragment>
                        )}
                      </div>

                      <div
                        className={css`
                          display: inline-block;
                          width: 33.33333%;
                          height: 100%;
                          vertical-align: top;
                          text-align: right;
                        `}
                      >
                        <div
                          className={css`
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            font-size: 30px;
                            align-items: center;
                            justify-content: center;
                          `}
                        >
                          <div>{match.game.title}</div>
                          <div>${match.currentAmount}</div>
                          <button
                            className={css`
                              margin-top: 15px;
                              cursor: pointer;
                              background: white;
                              color: #25308d;
                              font-size: 22px;
                              border: none;
                              outline: none;
                              border-radius: 3px;
                              padding: 5px 10px;
                            `}
                          >
                            fund this match
                          </button>
                        </div>
                      </div>
                      <div
                        className={css`
                          display: inline-block;
                          width: 33.33333%;
                          height: 100%;
                          vertical-align: top;
                          text-align: right;
                        `}
                      >
                        {match.team2.length === 1 && (
                          <React.Fragment>
                            <div style={{ marginBottom: 10, fontSize: 30 }}>
                              {match.team2[0].display_name}
                            </div>
                            <PlayerCard player={match.team2[0]} />
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

const selectContainerStyle = css`
  display: inline-block;
  color: white;
  margin: 10px auto;
  @media (max-width: 768px) {
    display: block;
  }
`;

const selectLabelStyle = css`
  display: inline-block;
  margin-top: 5px;
`;

const filterAndSortContainerStyle = css`
  display: inline-block;
  margin-top: 5px;
  margin-left: 20px;
`;

const matchesContainerStyle = css`
  min-height: 70vh;
  background: #3a3a3a;
`;

class PlayerCard extends React.Component {
  state = { clip: null };
  componentDidMount = () => {
    getUserClips(this.props.player.id)
      .then(res => res.json())
      .then(
        json =>
          json.data.length > 0 &&
          this.setState({
            clip:
              json.data[parseInt(Math.random() * json.data.length, 10)]
                .embed_url
          })
      );
  };
  render = () =>
    this.state.clip ? (
      <iframe
        title={this.props.player.id}
        src={this.state.clip}
        height="150"
        width="150"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true"
      />
    ) : (
      <img
        alt="team2"
        style={{ margin: 0 }}
        src={this.props.player.profile_image_url}
        width={150}
      />
    );
}

export default App;
