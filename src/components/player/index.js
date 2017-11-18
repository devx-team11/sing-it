import React, { Component } from 'react';
import ConnectPlayer from './connect-player';
import './index.css';

export default () => <ConnectPlayer />

// window.Demo.onSpotifyUserSessionExpires = () => {
//   window.Demo.WebPlaybackSDK.disconnect(); // Disconnect the player

// {/* <div>
//   <PlayerError
//     heading="Session expired."
//     message="Playback sessions only last 60 minutes. Refresh for new session." />
//   <Authorize />
// </div> */}
// };

// // window.Demo.renderWebPlaybackSDKError = (title, e) => {
// //   ReactDOM.render(
// //     <PlayerError heading={title} message={e} />,
// //   );
// // };
