import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = { width: "400px", margin: "auto", "padding": "30px" };

export default ({ handleChange }) => (
  <div style={style}>
    <Range allowCross={false} defaultValue={[0, 100]} onChange={handleChange} />
  </div>
);