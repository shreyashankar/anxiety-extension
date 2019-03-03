import React from 'react';
import {logMood, logActivity, logJournal} from './icons';
import Moods from './moods';
import Journal from './journal';
import Exercises from './exercises';

export default class Body extends React.Component {
  constructor() {
    super();
    this.state = { 
      highlighted: 0
    };
  }

  iconStyle(idx) {
    let opacity = 0.5;
    if (idx === this.state.highlighted) {
      opacity = 1.0;
    }

    let top = '0px';
    let left = '0px';
    if (idx === 0) {
      top = '5px';
    }
    if (idx === 1) {
      left = '5px';
    }

    return {
      width: '65px',
      height: '65px',
      display: 'flex',
      alignItems: 'center',
      margin: '20px',
      opacity: opacity,
      cursor: 'pointer',
      position: 'relative',
      top: top,
      left: left
    };
  }

  clickIcon(idx) {
    this.setState({highlighted: idx});
  }

  render() {

    let iconRowStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }

    let elem = <Moods />;
    if (this.state.highlighted === 1) {
      elem = <Journal />;
    } else if (this.state.highlighted === 2) {
      elem = <Exercises />;
    }


    return (
      <div id="body">
        <div id="iconDiv" style={iconRowStyle}>
          <div style={this.iconStyle(0)} onClick={() => this.clickIcon(0)}>
            {logMood()}
          </div>
          <div style={this.iconStyle(1)} onClick={() => this.clickIcon(1)}>
            {logJournal()}
          </div>
          <div style={this.iconStyle(2)} onClick={() => this.clickIcon(2)}>
            {logActivity()}
          </div>
        </div>
        {elem}
      </div>
    );

  }


}