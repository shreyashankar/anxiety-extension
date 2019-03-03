import React from 'react';
import {happy, excited, surprised, cool, sad, frustrated, angry, dead} from './icons';
import firebase from '../firebase.js'; // <--- add this line

export default class Moods extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedEmotion: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let emotion = e.currentTarget.id;
    let currTime = new Date();
    let item = {
      emotion: emotion,
      timestamp: currTime
    }
    const db = firebase.firestore();
    db.collection('emotions').add(item);  
    this.setState({loggedEmotion: true});
  }

  render() {

    let containerStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      width: '55%',
      justifyContent: 'center',
      margin: '20px'
    }

    let emojiStyle = {
      flex: '0 20%',
      margin: '10px',
      alignItems: 'center',
      cursor: 'pointer'
    }

    let textStyle = {
      margin: '16px',
      fontFamily: 'Montserrat-SemiBold',
      fontSize: '20px',
      color: '#040217',
      letterSpacing: 0,
      textAlign: 'center'
    }

    // TODO(shreya): change prompttext
    let promptText = 'How are you feeling?'

    let promptTextStyle = {
      margin: '20px',
      fontFamily: 'Roboto Mono',
      fontSize: '24px',
      color: '#040217',
      letterSpacing: 0,
      textAlign: 'center'
    }

    let elem = (
      <div style={textStyle}>
        Thanks for checking in!
      </div>
    );

    let moodContainerStyle = {
      display: 'flex',
      justifyContent: 'center'
    }

    if (!this.state.loggedEmotion) {
      elem = (
        <div id="emoji-container" style={containerStyle}>
          <div id="happy" style={emojiStyle} onClick={this.handleClick}>{happy()}</div>
          <div id="excited" style={emojiStyle} onClick={this.handleClick}>{excited()}</div>
          <div id="surprised" style={emojiStyle} onClick={this.handleClick}>{surprised()}</div>
          <div id="cool" style={emojiStyle} onClick={this.handleClick}>{cool()}</div>
          <div id="sad" style={emojiStyle} onClick={this.handleClick}>{sad()}</div>
          <div id="frustrated" style={emojiStyle} onClick={this.handleClick}>{frustrated()}</div>
          <div id="angry" style={emojiStyle} onClick={this.handleClick}>{angry()}</div>
          <div id="dead" style={emojiStyle} onClick={this.handleClick}>{dead()}</div>
        </div>
      );
    }

    return (
      <div>
        <div id="prompt-text" style={promptTextStyle}>
          {promptText}
        </div>
        <div style={moodContainerStyle}>
          {elem}
        </div>
      </div>
    );
  }

}