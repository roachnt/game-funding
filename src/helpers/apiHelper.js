import { getTwitchUser } from "../helpers/twitchHelper";
import api from "../helpers/api";
export const getMatchesAndFormat = () =>
  fetch(`${api}/matches`)
    .then(res => res.json())
    .then(async matches => {
      matches = await Promise.all(
        matches.map(async match => {
          match.team1 = await Promise.all(
            match.team1.map(async entity => {
              const response = await getTwitchUser(entity.twitchUsername);
              const json = await response.json();
              return json.data[0];
            })
          );
          match.team2 = await Promise.all(
            match.team2.map(async entity => {
              const response = await getTwitchUser(entity.twitchUsername);
              const json = await response.json();
              return json.data[0];
            })
          );
          return match;
        })
      );
      return matches;
    });
