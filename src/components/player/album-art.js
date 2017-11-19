import React from 'react';

export default (props) => (
  <div className="player player-album-art">
    <img src={props.image_url} />
  </div>
);