import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default ({ inputValue, handleChange, handleSubmit}) => (
  <form onSubmit={handleSubmit} >
      <TextField
      hintText='Enter URI' 
      name='finder' 
      id='finder' 
      value={inputValue} 
      onChange={e => handleChange(e)}
    />
    <RaisedButton label="Search" type="Submit" />

  </form>

);