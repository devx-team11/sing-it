import React, { Component } from 'react';
import logo from './logo.svg';
import { Form, SpotifyLogin, Player, Slider } from './components';
import { parseQuery } from './util';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor () {
    super()
    this.state = {
      inputValue: '',
      snippetBeginning: 0,
      snippetEnd: 100,
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFormChange (e) {
    this.setState({ inputValue: e.target.value });
  }
  handleSubmit () {
    alert(`Finding song ${this.state.inputValue}`);
  }
  handleSliderChange (changeArray) {
    this.setState(state => ({
      snippetBeginning: changeArray[0],
      snippetEnd: changeArray[1]
    }))
  }
  shouldRenderPlayer () {
    setTimeout(() => {
      console.log(window.Demo.onSpotifyPlayerConnected);
      this.setState({ renderPlayer: window.Demo.onSpotifyPlayerConnected})
    }, 2000);
  }
  componentDidMount () {
    this.shouldRenderPlayer();
  }
  render() {
    // Demo.onSpotifyUserSessionExpires = () => {
    //   Demo.WebPlaybackSDK.disconnect(); // Disconnect the player

    //   ReactDOM.render(
    //     <div>
    //       <PlayerError
    //         heading="Session expired."
    //         message="Playback sessions only last 60 minutes. Refresh for new session." />
    //       <Authorize />
    //     </div>,
    //     document.getElementById('screen')
    //   );
    // };

    // Demo.renderWebPlaybackSDKError = (title, e) => {
    //   ReactDOM.render(
    //     <PlayerError heading={title} message={e} />,
    //     document.getElementById('screen')
    //   );
    // };
    return (
    <MuiThemeProvider>
      <div className='App'>
        <Slider handleChange={this.handleSliderChange}/>
        {window.Demo.isAccessToken() === false && <SpotifyLogin />}
        <Form handleChange={this.handleFormChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
        { this.state.renderPlayer && <Player /> }
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;

