import React from 'react';
import SPOTIFYAUTHURL from '../../config';

export default () => (
  <button className="btn btn-lg btn-primary" onClick={window.Demo.sendToLogin}>Log in with Spotify</button>
);