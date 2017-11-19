import React from 'react';

export default (props) => {
  const style = {
    backgroundImage: `url(${props.image_url})`,
    backgroundSize: '200% auto',
    backgroundPosition: 'center center',
  };

  return <div className="screen screen-player-album-art" style={style}></div>
};