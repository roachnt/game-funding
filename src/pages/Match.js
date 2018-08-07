import React from "react";
import { css } from "emotion";
import Navbar from "../components/Navbar";
import { getMatchAndFormat } from "../helpers/apiHelper";
import { getUserClips } from "../helpers/twitchHelper";

export default class Match extends React.Component {
  state = { match: null };
  componentWillMount = async () => {
    const match = await getMatchAndFormat(this.props.match.params.matchId);
    this.setState({ match });
  };
  render() {
    return (
      <React.Fragment>
        <Navbar absolute />
        {this.state.match ? (
          <div
            style={{
              height: "100vh",
              background: "#3a3a3a",
              paddingTop: 50,
              color: "white"
            }}
          >
            <div
              className={css`
                display: inline-block;
                width: 33.33333%;
                height: 300px;
                vertical-align: top;
              `}
            >
              {this.state.match.team1.length === 1 && (
                <PlayerCard player={this.state.match.team1[0]} />
              )}
            </div>
            <div
              className={css`
                display: inline-block;
                width: 33.33333%;
                height: 300px;
                vertical-align: top;
              `}
            />
            <div
              className={css`
                display: inline-block;
                width: 33.33333%;
                height: 300px;
                vertical-align: top;
                text-align: right;
              `}
            >
              {this.state.match.team2.length === 1 && (
                <PlayerCard player={this.state.match.team2[0]} />
              )}
            </div>
          </div>
        ) : (
          "Loading match details..."
        )}
      </React.Fragment>
    );
  }
}

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
  render = () => (
    <div>
      <div style={{ fontSize: 50, margin: 20 }}>
        {this.props.player.display_name}
      </div>
      <div>
        {this.state.clip ? (
          <iframe
            style={{ marginLeft: 20 }}
            title={this.props.player.id}
            src={this.state.clip}
            height="500"
            width="500"
            frameborder="0"
            scrolling="no"
            allowFullScreen="true"
          />
        ) : (
          <img
            alt="team2"
            style={{ margin: "0 20px", borderRadius: 3 }}
            src={this.props.player.profile_image_url}
            width={500}
          />
        )}
      </div>
    </div>
  );
}
