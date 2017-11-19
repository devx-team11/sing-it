import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './logo.svg';
import { Form, SpotifyLogin, Player, Slider } from './components';
import { parseQuery } from './util';
import './App.css';

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
  shouldRenderPlayer () {
    setTimeout(() => {
      this.setState({ renderPlayer: window.Demo.onSpotifyPlayerConnected})
    }, 2000);
  }
  componentDidMount () {
    this.shouldRenderPlayer();
  }
  render() {
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

