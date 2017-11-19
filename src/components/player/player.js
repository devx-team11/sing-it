import React, { Component } from 'react';
import PlayerAlbumArt from './album-art';
import PlayerTrack from './player-track';
import PlayerArtists from './artists';
import PlayerBackgroundAlbumArt from './background-album-art';
import Slider from '../slider';

export default class Player extends Component {
  constructor() {
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
            <div className="col-sm-12">
              <PlayerAlbumArt image_url={image.url} />
              <PlayerTrack track={current_track} />
              <PlayerArtists artists={current_track.artists} />
              <Slider handleChange={this.handleCroppingChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};