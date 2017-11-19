import React, { Component } from 'react';
import PlayerAlbumArt from './album-art';
import PlayerTrack from './player-track';
import PlayerControls from './controls';
import PlayerArtists from './artists';
import PlayerBackgroundAlbumArt from './background-album-art';
import Slider from '../slider';

export default class Player extends Component {
  handleCroppingChange ([beginPercentage, endPercentage]) {
      window.Demo.WebPlaybackSDK.getCurrentState().then(res => {
        const { duration_ms } = res.track_window.current_track
        const snippetBeginning = Math.floor((duration_ms / 100) * beginPercentage)
        const snippetEnding = Math.floor((duration_ms / 100) * endPercentage)
        window.Demo.WebPlaybackSDK.seek().then(res => {
          snippetBeginning;
          window.Demo.WebPlaybackSDK.resume();
        });
      });
  }
  render() {
    let { current_track } = this.props.currentState.track_window;
    let image = current_track.album.images[2];
    return (
      <div className="screen screen-player">
        <div className="player">
          <div className="row">
            <div className="col-sm-3">
              <PlayerAlbumArt image_url={image.url} />
            </div>
            <div className="col-sm-9">
              <PlayerTrack track={current_track} />
              <Slider handleChange={this.handleCroppingChange} />
              <PlayerArtists artists={current_track.artists} />
              <PlayerControls state={this.props.currentState} />
            </div>
          </div>
        </div>

        <PlayerBackgroundAlbumArt image_url={image.url} />
      </div>
    );
  }
};