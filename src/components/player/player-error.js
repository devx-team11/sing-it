import React from 'react';

export default () => (
  <div className="screen screen-error">
    <div className="alert alert-danger">
      <h3>{this.props.heading}</h3>
      <p>{this.props.message}</p>
    </div>
  </div>
)