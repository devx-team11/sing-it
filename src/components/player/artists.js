import React from 'react';

const renderArtists = (props) => props.artists.map(artist => <li key={artist.name}>{artist.name}</li>)

export default (props) => (
  <ul className="player player-artists">{renderArtists(props)}</ul>
);