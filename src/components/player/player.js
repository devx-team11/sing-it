import React, { Component } from 'react';
import PlayerAlbumArt from './album-art';
import PlayerProgress from './player-progress';
import PlayerTrack from './player-track';
import PlayerControls from './controls';
import PlayerArtists from './artists';
import PlayerBackgroundAlbumArt from './background-album-art';

export default class Player extends Component {
  render() {
    let { current_track } = this.props.currentState.track_window;
    let image = current_track.album.images[2];
    // let input = this.state.value || '';
    return (
      <div className="screen screen-player">
        <div className="player">
          <div className="row">
            <div className="col-sm-3">
              <PlayerAlbumArt image_url={image.url} />
            </div>
            <div className="col-sm-9">
              <PlayerProgress state={this.props.currentState} showPosition={true} showDuration={true} />
              <PlayerTrack track={current_track} />
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