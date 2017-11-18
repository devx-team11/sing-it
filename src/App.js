import React, { Component } from 'react';
import { Form } from './components';
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
  render() {
    return (
    <MuiThemeProvider>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to Sing-it</h1>
        </header>
        <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
