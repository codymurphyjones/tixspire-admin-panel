// Main.js
import React from 'react';
import './style.css';

//import { withTheme } from 'With/theme'

const ScreenArea = (props) => {
  return (
        <div className="container" style={{flex: 1, marginTop: 20, flexGrow: 1, height: "100%", backgroundColor: props.backgroundColor || "#fff", overflowY: 'auto' }}>
	          {props.children}
        </div>
  );
};

export default ScreenArea;

