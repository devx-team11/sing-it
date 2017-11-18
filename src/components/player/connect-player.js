import React, { Component } from 'react';
import Player from './player';
import { SDK, init } from '../../util';

export default class ConnectPlayer extends Component {
  constructor () {
    super()
    this.state = {
      showPlayer: false,
    }
  }
  listenForFocusOnWebPlayer() {
    let _this = this;
    let stateHandlerCallback = (state) => {
      _this.stateHandler(state);
    };

    // Call once when connected
    window.Demo.WebPlaybackSDK.getCurrentState().then(stateHandlerCallback);

    // When a change is made
    window.Demo.WebPlaybackSDK.on("player_state_changed", stateHandlerCallback);

    // Poll status every 0.1 seconds
    // This is just to improve the UI for the progress bar
    setInterval(() => {
      window.Demo.WebPlaybackSDK.getCurrentState().then(stateHandlerCallback);
    }, 100);
  }
  waitingToStart() {
    let player_name = window.Demo.WebPlaybackSDK._options.name;
    return (
      <div className="screen screen-connect-player">
        <div className="icon grid-loading-icon">
          <span className="visually-hidden">Loading</span>
        </div>
        <br />
        <h1>Select <span className="spotify-green">{player_name}</span> on Spotify Connect ...</h1>
      </div>
    );
  }
  stateHandler(state) {
    if (state && state.track_window) this.setState({ showPlayer: true });
    if (this.state.showPlayer) return <Player track={state.track_window} />
    else {
      return this.waitingToStart();
    }
  }
  render() {
    this.listenForFocusOnWebPlayer(); // Start waiting to hear back from Demo.WebPlaybackSDK
    window.Demo.transferPlayback();          // Transfer playback to SDK (via Connect Web API over HTTP)
    return this.stateHandler();
  }
}