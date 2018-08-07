export const getTwitchUserByLogin = username =>
  fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
    headers: {
      "Client-ID": "dg93br2vn212x9jmgfem7uj4lkypgo"
    }
  });

export const getUserClips = userId =>
  fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${userId}`, {
    headers: {
      "Client-ID": "dg93br2vn212x9jmgfem7uj4lkypgo"
    }
  });
