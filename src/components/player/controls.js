import React, { Component } from 'react';

export default class Controls extends Component {
  constructor (props) {
    super(props)
    this.reverse15Seconds = this.reverse15Seconds.bind(this);
    this.skip15Seconds = this.skip15Seconds.bind(this);
  }
  resume() {
    window.Demo.WebPlaybackSDK.resume();
  }
  pause() {
    window.Demo.WebPlaybackSDK.pause();
  }
  previousTrack() {
    window.Demo.WebPlaybackSDK.previousTrack();
  }
  nextTrack() {
    window.Demo.WebPlaybackSDK.nextTrack();
  }
  mute() {
    window.Demo.WebPlaybackSDK.setVolume(0);
  }
  setVolumeToMax() {
    window.Demo.WebPlaybackSDK.setVolume(1);
  }
  // TODO : replace 15 seconds with user input
  reverse15Seconds() {
    let position_ms = this.props.state.position - (15 * 1000);
    window.Demo.WebPlaybackSDK.seek(position_ms);
  }
  skip15Seconds() {
    let position_ms = this.props.state.position + (15 * 1000);
    window.Demo.WebPlaybackSDK.seek(position_ms);
  }
  startFromBeginning() {
    window.Demo.WebPlaybackSDK.seek(0);
  }
  renderPlayOrPause() {
    if (this.props.state.paused === true) {
      return (<li><a onClick={this.resume} className="fa fa-play">resume</a></li>);
    } else {
      return (<li><a onClick={this.pause} className="fa fa-pause">pause</a></li>);
    }
  }
  render () {
    let track_id = this.props.state.track_window.current_track.id;
    let track_url = "https://open.spotify.com/track/" + track_id;

    return (
      <ul className="player player-controls">
        <li><a onClick={this.previousTrack} className="fa fa-fast-backward"></a></li>
        {this.renderPlayOrPause()}
        <li><a onClick={this.nextTrack} className="fa fa-fast-forward">Next</a></li>
        <li><a onClick={this.mute} className="fa fa-volume-off">Mute</a></li>
        <li><a onClick={this.setVolumeToMax} className="fa fa-volume-up">Volume Max</a></li>
        <li><a onClick={this.reverse15Seconds} className="fa fa-backward">reverse15Seconds</a></li>
        <li><a onClick={this.skip15Seconds} className="fa fa-forward">skip15Seconds</a></li>
        <li><a onClick={this.startFromBeginning} className="fa fa-fast-backward">From Top</a></li>
      </ul>
    );
  }
}