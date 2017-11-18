import React, { Component } from 'react';
import logo from './logo.svg';
import { Form } from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to Sing-it</h1>
        </header>
        <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} inputValue={this.state.inputValue} />
      </div>
    );
  }
}

export default App;
