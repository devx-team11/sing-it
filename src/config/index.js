const config = {
  SPOTIFY_CLIENT_ID: '0bca4df677e64b0dbc4cc3c50bc506c9',
  SPOTIFY_AUTH_URL: 'https://accounts.spotify.com/authorize',
  SPOTIFY_SEARCH_URL: 'https://api.spotify.com/v1/search',
  REDIRECT_URI: 'http://localhost:3000/callback',
  SCOPES: 'user-read-private user-read-email'
};

const SPOTIFYAUTHURL = `${config.SPOTIFY_AUTH_URL}?client_id=${config.SPOTIFY_CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&scope=${encodeURIComponent(config.SCOPES)}&response_type=token&state=123`;

const SPOTIFYSEARCHURL = `${config.SPOTIFY_SEARCH_URL}`;

export default SPOTIFYSEARCHURL
