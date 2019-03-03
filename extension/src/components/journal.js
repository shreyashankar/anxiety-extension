import React from 'react';
import firebase from '../firebase.js';
import Button from './button';

export default class Journal extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedEntry: false,
      prompt: '',
      defaultResponse: 'Just type in a few words. You got this!',
      response: ''
    }

    this.getPrompt = this.getPrompt.bind(this);
    this.getPrompt();
    this.handleTextareaChange= this.handleTextareaChange.bind(this);
    this.handleClick= this.handleClick.bind(this);
  }

  getPrompt() {
    if (this.state.prompt !== '') {
      return;
    }
    const db = firebase.firestore();
    const NUM_DOCS = 30;
    let random_id = Math.floor(Math.random() * NUM_DOCS); 
    db.collection('journal-prompts').doc(random_id.toString()).get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        let prompt = doc.data()['prompt'];
        this.setState({journalID: random_id, prompt: prompt});
      }
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  }

  handleTextareaChange(e) {
    this.setState({response: e.target.value})
  }

  handleClick(e) {
    let currTime = new Date();
    let item = {
      entry: this.state.response,
      timestamp: currTime,
      journalPromptID: this.state.journalID
    }
    const db = firebase.firestore();
    db.collection('journal-entries').add(item);  
    this.setState({loggedEntry: true});
  }

  render() {

    let containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexFlow: 'column nowrap'
    }

    let promptTextStyle = {
      margin: '20px',
      fontFamily: 'Roboto Mono',
      fontSize: '24px',
      color: '#040217',
      letterSpacing: 0,
      textAlign: 'center',
      width: '800px'
    }

    let textAreaStyle = {
      border: 'none',
      resize: 'vertical',
      width: '800px',
      height: '200px',
      fontFamily: 'Roboto Mono',
      fontSize: '20px',
      color: 'rgba(4,2,23,0.5)',
      letterSpacing: '0',
      textAlign: 'center',
      margin: '30px'
    }

    let buttonStyle = {
      width: '150px',
    }

    let finishedTextStyle = {
      margin: '16px',
      fontFamily: 'Montserrat-SemiBold',
      fontSize: '20px',
      color: '#040217',
      letterSpacing: 0,
      textAlign: 'center'
    }

    let journalContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'column nowrap',
      alignItems: 'center'
    };

    let elem = (
      <div style={finishedTextStyle}>
        Thanks for checking in!
      </div>
    );

    if (! this.state.loggedEntry) {
      elem = (
        <div style={journalContainerStyle}>
          <textarea id="journal-response" placeholder={this.state.defaultResponse} style={textAreaStyle} onChange={this.handleTextareaChange}/>
          <Button text="Log it away" style={buttonStyle} onClick={this.handleClick}/>
        </div>
      );
    }

    return (
      <div style={containerStyle}>
        <div id="prompt-text" style={promptTextStyle}>
          {this.state.prompt}
        </div>
        {elem}
      </div>
    );
  }

}