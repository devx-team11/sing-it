import React, { Component } from 'react';
import logo from './singit.png';
import { Form, SpotifyLogin } from './components';
import { parseQuery } from './util';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <SpotifyLogin />
        <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
