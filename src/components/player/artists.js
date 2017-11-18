import React from 'react';

const renderArtists = (props) => props.artists.map(artist => <li>{artist.name}</li>)

export default (props) => (
  <ul className="player player-artists">{this.renderArtists(props)}</ul>
);