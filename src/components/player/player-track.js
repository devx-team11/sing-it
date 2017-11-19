import React from 'react';

const parseTrackName = (props) => props.track.name.split("(feat")[0];

export default (props) => (
    <h1 className="player player-track">{parseTrackName(props)}</h1>
);