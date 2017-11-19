import 'rc-slider/assets/index.css';
import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = { width: "400px", marginTop: "5%", padding: "30px", float: "left" };

export default ({ handleChange }) => (
  <div style={style}>
    <Range allowCross={false} defaultValue={[0, 100]} onChange={handleChange} />
  </div>
);