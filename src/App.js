import React, { Component } from 'react';
import logo from './logo.svg';
import { Form, SpotifyLogin, ShareButton } from './components';
import { parseQuery } from './util';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor () {
    super()
    this.state = {
      inputValue: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange (e) {
    this.setState({ inputValue: e.target.value });
  }
  handleSubmit () {
    alert(`Finding song ${this.state.inputValue}`);
  }
  componentDidMount () {
    if (window.location.pathname === '/callback') {
      localStorage.setItem('spotify-token', parseQuery(window.location, 'hash').access_token);
    }
  }
  render() {  
    return (
      <MuiThemeProvider>
        <div className='App'>
          <header className='App-header'>
            <h1 className='App-title'>Welcome to Sing-it</h1>
          </header>
          <SpotifyLogin />
          <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
          <ShareButton snippetURI="https://open.spotify.com/album/3cQO7jp5S9qLBoIVtbkSM1" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
