import React, { Component } from 'react';
import Player from './player';

export default class ConnectPlayer extends Component {
  constructor () {
    super()
    this.state = {}
  }
  transferPlayback () {
    let request = new Request("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: new Headers({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + window.Demo.getAccessToken()
      }),
      body: JSON.stringify({
        play: true,
        device_ids: [window.Demo.WebPlaybackSDK._options.id]
      })
    });
    return fetch(request);
  }
  listenForFocusOnWebPlayer() {
    let _this = this;
    let stateHandlerCallback = (state) => {
      _this.stateHandler(state);
    };

    window.Demo.WebPlaybackSDK.getCurrentState().then(stateHandlerCallback);

    window.Demo.WebPlaybackSDK.on("player_state_changed", stateHandlerCallback);
  }
  waitingToStart() {
    setInterval(() => {
      window.Demo.WebPlaybackSDK.getCurrentState().then(res => {
        if (res) this.setState({ currentState: res });
        this.stateHandler();
      });
    }, 100);
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
    if (!this.state.currentState) {
      return this.waitingToStart();
    }
    return <Player currentState={this.state.currentState} />
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.currentState !== nextState.currentState) return true;
    return false;
  }
  componentDidMount () {
    this.transferPlayback();
    this.listenForFocusOnWebPlayer();
  }
  render() {
    return this.stateHandler();
  }
}