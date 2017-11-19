import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from './singit.png';
import { Form, SpotifyLogin, Player, TrackView } from './components';
import './App.css';
import SPOTIFYSEARCHURL from './config';

class App extends Component {
  constructor () {
    super()

    const [ trackId, beginAt, endAt ] = window.location.search
                                        .replace("?", '')
                                        .split('&')
                                        .map(str => str.split('=')[1])

    this.state = {
      inputValue: '',
      snippetBeginning: 0,
      snippetEnd: 100,
      pathname: window.location.pathname,
      queryStrings: {
        trackId,
        beginAt,
        endAt
      }
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
  handleSearchTracks = (query) => {
    let request = new Request("https://api.spotify.com/v1/search?type=track&q="+query+"*&market=from_token", {
      method: "GET",
      headers: new Headers({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + window.Demo.getAccessToken()
      })
    });

    return window.fetch(request).then((resp) => resp.json());
  }
  handlePlayTrack = (uri) => {
    let request = new Request("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: new Headers({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + window.Demo.getAccessToken()
      }),
     body: JSON.stringify({ uris: [uri] })
    });

    fetch(request).catch(e => console.error(e));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.handleSearchTracks(this.state.inputValue).then(results => {
      this.handlePlayTrack(results.tracks.items["0"].uri)
    })
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
    let mainComponent = undefined
    if(this.state.pathname === '/track') {
      window.localStorage.setItem('queryStrings', {
        trackId: this.state.queryStrings.trackId,
        beginAt: this.state.queryStrings.beginAt,
        endAt: this.state.queryStrings.endAt
      })
    }
    else if(this.state.pathname === '/') {
      window.localStorage.clear()
    }
    
    if(window.Demo.isAccessToken() !== false) {
        if (localStorage.getItem('queryStrings') !== null){
          const { trackId, beginAt, endAt } = localStorage.getItem('queryStrings')
          mainComponent = (<TrackView 
            handlePauseButtonClick={() => console.log('pause')}
            handlePlayButtonClick={() => console.log('play')}
          />)
        }
        else {
          mainComponent = (
            <div>
              <Form handleChange={this.handleFormChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
              { this.state.renderPlayer && <Player /> }
            </div>
          )
        }
    }
    else {
      mainComponent = (<SpotifyLogin />)
    }

    return (
      <MuiThemeProvider>
        <div className='App'>
        <header className='App-header'>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          {mainComponent}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

