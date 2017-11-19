var Authorize = React.createClass({
  render () {
    return (
      <div className="screen">
        <button className="btn btn-lg btn-primary" onClick={Demo.sendToLogin}>Log in with Spotify</button>
      </div>
    );
  }
});