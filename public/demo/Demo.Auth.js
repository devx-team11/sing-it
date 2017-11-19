/* global window.Demo */

/**
 * (C) 2017 Spotify AB
 */

/**
 * Take them to accounts.spotify.com
 * Why? So we can get an access token to play music!
 *
 * Code sample:
 *   document.getElementById('button').onclick = (e) => {
 *     e.preventDefault();
 *     window.Demo.sendToLogin();
 *   }
 */

window.Demo.sendToLogin = () => {
  // Your Spotify Developer Application
  // Get at https://beta.developer.spotify.com/dashboard/
  let client_id    = "0bca4df677e64b0dbc4cc3c50bc506c9";
  let redirect_uri = "http://localhost:3000/callback";
  
  // You don't need to update these.
  let scopes = "streaming user-read-birthdate " + 
               "user-read-email user-read-private " +
               "user-modify-playback-state";
  
  window.location = [
    "https://accounts.spotify.com/authorize",
    `?client_id=${client_id}`,
    `&redirect_uri=${redirect_uri}`,
    `&scope=${scopes.replace(" ", "%20")}`,
    "&response_type=token",
    "&show_dialog=true"
  ].join('');
};

/**
 * When they return, let's get the hash.
 * Why? Well, if we don't, we can't get the access token Spotify gave us!
 *
 * Example code:
 *   if (window.Demo.isAccessToken()) {
 *     console.log("My Access Token", window.Demo.getAccessToken());
 *   }
 */

window.Demo.isAccessToken = () => {
  return window.Demo.getAccessToken() != null;
};

window.Demo.getAccessToken = () => {
  let hashExists = window.location.hash.length > 0;
  let hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  if (Demo.access_token) {
    // Return the key we've saved
    return Demo.access_token;
  }

  else if (hashExists) {
    // Empty the hash
    window.location.hash = '';

    // Set the access token
    Demo.access_token = hash.access_token;

    // Let us know when the access token expires
    setTimeout(() => {
      if (window.onSpotifyUserSessionExpires) {
        window.onSpotifyUserSessionExpires();
      }
    }, hash.expires_in * 1000);

    // Return the access token
    return Demo.access_token;
  }
  else {
    return null;
  }
};
