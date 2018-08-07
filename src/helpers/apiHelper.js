import { getTwitchUserByLogin } from "../helpers/twitchHelper";
import api from "../helpers/api";

// Most of this is just getting twitch information
export const getMatchesAndFormat = () =>
  fetch(`${api}/matches`)
    .then(res => res.json())
    // Iterate through all the matches
    .then(async matches => {
      matches = await Promise.all(
        matches.map(async match => {
          // For every match, set team1 to a new array containing all twitch info
          match.team1 = await Promise.all(
            // For every enitity, get their twitch info
            match.team1.map(async entity => {
              const response = await getTwitchUserByLogin(
                entity.twitchUsername
              );
              const json = await response.json();
              return json.data[0];
            })
          );
          // Similar to team1
          match.team2 = await Promise.all(
            match.team2.map(async entity => {
              const response = await getTwitchUserByLogin(
                entity.twitchUsername
              );
              const json = await response.json();
              return json.data[0];
            })
          );
          return match;
        })
      );
      return matches;
    });

// Same as above but for a singular match
export const getMatchAndFormat = matchId =>
  fetch(`${api}/matches/${matchId}`)
    .then(res => res.json())
    .then(async match => {
      match.team1 = await Promise.all(
        match.team1.map(async entity => {
          const response = await getTwitchUserByLogin(entity.twitchUsername);
          const json = await response.json();
          return json.data[0];
        })
      );
      match.team2 = await Promise.all(
        match.team2.map(async entity => {
          const response = await getTwitchUserByLogin(entity.twitchUsername);
          const json = await response.json();
          return json.data[0];
        })
      );
      return match;
    });
