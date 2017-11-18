import React, { Component } from 'react';

export default class Controls extends Component {
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
        return (<li><a onClick={this.resume} className="fa fa-play"></a></li>);
      } else {
        return (<li><a onClick={this.pause} className="fa fa-pause"></a></li>);
      }
    }
    render () {
      let track_id = this.props.state.track_window.current_track.id;
      let track_url = "https://open.spotify.com/track/" + track_id;

      return (
        <ul className="player player-controls">
          <li><a onClick={this.previousTrack} className="fa fa-fast-backward"></a></li>
          {this.renderPlayOrPause()}
          <li><a onClick={this.nextTrack} className="fa fa-fast-forward"></a></li>
          <li><a onClick={this.mute} className="fa fa-volume-off"></a></li>
          <li><a onClick={this.setVolumeToMax} className="fa fa-volume-up"></a></li>
          <li><a onClick={this.reverse15Seconds} className="fa fa-backward"></a></li>
          <li><a onClick={this.skip15Seconds} className="fa fa-forward"></a></li>
          <li><a onClick={this.startFromBeginning} className="fa fa-fast-backward"></a></li>
        </ul>
      );
    }
}