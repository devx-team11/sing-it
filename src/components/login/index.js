import React from 'react';
import SPOTIFYAUTHURL from '../../config';
import RaisedButton from 'material-ui/RaisedButton';


export default () => (
<div className = 'loginSection'>
	<p>Login to Spotify to start using SingIt!</p>
  	<RaisedButton label="Login" onClick={window.Demo.sendToLogin} />
 </div>
);