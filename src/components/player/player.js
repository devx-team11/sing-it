import React, { Component } from 'react';
import PlayerAlbumArt from './album-art';
import PlayerProgress from './player-progress';
import PlayerTrack from './player-track';
import PlayerControls from './controls';
import PlayerArtists from './artists';
import PlayerBackgroundAlbumArt from './background-album-art';

export default class Player extends Component {
  constructor (props) {
    super(props)
  }
  current_track() {
    return this.props.track.current_track;
  }

  render() {
    let track = this.current_track();
    let image = track.album.images[2];
    // let input = this.state.value || '';
    return (
      <div className="screen screen-player">
        <div className="player">
          <div className="row">
            <div className="col-sm-3">
              <PlayerAlbumArt image_url={image.url} />
            </div>
            <div className="col-sm-9">
              <PlayerProgress state={this.props.state} showPosition={true} showDuration={true} />
              <PlayerTrack track={track} />
              <PlayerArtists artists={track.artists} />
              <span><a href={track.album.url}></a></span>
              <PlayerControls state={this.props.state} />
            </div>
          </div>
        </div>

        <PlayerBackgroundAlbumArt image_url={image.url} />
      </div>
    );
  }
};