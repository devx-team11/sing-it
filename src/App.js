import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './singit.png';
import { Form, SpotifyLogin, Player } from './components';
import './App.css';
import SPOTIFYSEARCHURL from './config';

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
  }
  handleFormChange (e) {
    this.setState({ inputValue: e.target.value });
  }
  handleSliderChange (changeArray) {
    this.setState(state => ({
      snippetBeginning: changeArray[0],
      snippetEnd: changeArray[1]
    }))
  }
  handleSubmit = (e) => {
    //alert(`Finding song ${this.state.inputValue}`);
	
	e.preventDefault();
	let self = this;
	var results = fetch(SPOTIFYSEARCHURL+`?q=${this.state.inputValue}&type=track&market=US&access_token=`+window.Demo.getAccessToken())
		.then(response => response.json())		
		.catch(console.log);
	
	results.then(function (resutlsVal) {
		if(resutlsVal.tracks.items.length > 0) {
			self.setState({ nextTrack: resutlsVal.tracks.items[0] });
			//alert(resutlsVal.tracks.items[0].external_urls.spotify);
		}
	});
	
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
        <header className='App-header'>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          {window.Demo.isAccessToken() === false && <SpotifyLogin />}
          <Form handleChange={this.handleFormChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
          { this.state.renderPlayer && <Player nextTrack={this.state.nextTrack} /> }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

