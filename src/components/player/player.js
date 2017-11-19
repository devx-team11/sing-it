import React, { Component } from 'react';
import PlayerAlbumArt from './album-art';
import PlayerTrack from './player-track';
import PlayerControls from './controls';
import PlayerArtists from './artists';
import PlayerBackgroundAlbumArt from './background-album-art';
import Slider from '../slider';

export default class Player extends Component {
  constructor () {
    super()
    this.state = {};
  }
  handleCroppingChange = ([beginPercentage, endPercentage]) => {
      window.Demo.WebPlaybackSDK.getCurrentState().then(res => {
        const { duration } = res
        const snippetBeginning = Math.floor((duration / 100) * beginPercentage)
        const snippetEnding = Math.floor((duration / 100) * endPercentage)
        this.setState({ snippetBeginning, snippetEnding });
        window.Demo.WebPlaybackSDK.seek(snippetBeginning).then(res => {
          window.Demo.WebPlaybackSDK.resume();
        });
      });
  }
  restartSong = () => {
    window.Demo.WebPlaybackSDK.seek(this.state.snippetBeginning).then(res => {
      window.Demo.WebPlaybackSDK.resume();
    });
  }
  componentDidMount () {
    setInterval(() => {
      window.Demo.WebPlaybackSDK.getCurrentState().then(playState => {
        if(playState && this.state.snippetEnding && (playState.position >= this.state.snippetEnding || playState.position >= playState.duration)) {
          this.restartSong()
          this.setState(state => ({
            playState
          }))
        }
      }).catch(e => console.error(e))
    }, 1000)
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