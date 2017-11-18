import React from 'react';

export default ({ inputValue, handleChange, handleSubmit}) => (
  <form onSubmit={handleSubmit} >
    <label htmlFor='finder'>Enter URI</label>
    <input
      type='text'
      name='finder'
      id='finder'
      value={inputValue}
      onChange={e => handleChange(e)}
      />
    <input type='Submit' value='Search' />
  </form>
);