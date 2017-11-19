import React from 'react';

export default ({handlePlayButtonClick, handlePauseButtonClick}) => (
  <div>
    <button onClick={handlePlayButtonClick}>Play</button>
    <button onClick={handlePauseButtonClick}>Pause</button>
  </div>
);