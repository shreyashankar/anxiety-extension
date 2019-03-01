import React from 'react';
import {logMood, logActivity, logJournal} from './icons';

export default class Body extends React.Component {
  constructor() {
    super();
    this.state = { 
      highlighted: 0
    };
  }

  render () {

    let iconRowStyle = {
      'display': 'flex',
      'flexDirection': 'row',
      'justify-content': 'center'
    }

    return (
      <div id="iconDiv" style={iconRowStyle}>
        <div>{logMood()}</div>
        <div>{logJournal()}</div>
        <div>{logActivity()}</div>
      </div>
    );

  }


}