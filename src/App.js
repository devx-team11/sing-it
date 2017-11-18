import React, { Component } from 'react';
import logo from './logo.svg';
import { Form, SpotifyLogin, Slider } from './components';
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
    // this.handleFormChange = this.handleFormChange.bind(this);
    // this.handleSliderChange = this.handleSliderChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFormChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  handleSubmit = () => {
    alert(`Finding song ${this.state.inputValue}`);
  }
  handleSliderChange = (changeArray) => {
    this.setState(state => ({
      snippetBeginning: changeArray[0],
      snippetEnd: changeArray[1]
    }))
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
        <Form handleChange={this.handleFormChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
        <Slider handleChange={this.handleSliderChange}/>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
