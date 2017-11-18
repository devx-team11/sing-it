import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

export default ({ inputValue, handleChange, handleSubmit}) => (
<div className='searchSection'>
<p>Enter the link of the song you want to use.</p>
  <form onSubmit={handleSubmit} >
      <TextField
      hintText='Enter URI' 
      name='finder' 
      id='finder' 
      value={inputValue} 
      onChange={e => handleChange(e)}
      /> 
  <RaisedButton style={style} label="Search" type="Submit" />

  </form>
</div>
);