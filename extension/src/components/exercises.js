import React from 'react';
import firebase from '../firebase.js';
import Button from './button';

export default class Exercises extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedExercise: false,
      prompt: ''
    }

    this.getPrompt = this.getPrompt.bind(this);
    this.getPrompt();
    this.handleClick= this.handleClick.bind(this);
  }

  getPrompt() {
    if (this.state.prompt !== '') {
      return;
    }
    const db = firebase.firestore();
    const NUM_DOCS = 7;
    let random_id = Math.floor(Math.random() * NUM_DOCS); 
    db.collection('exercises').doc(random_id.toString()).get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        let prompt = doc.data()['prompt'];
        this.setState({exerciseID: random_id, prompt: prompt});
      }
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  }

  handleClick(e) {
    let currTime = new Date();
    let item = {
      timestamp: currTime,
      exerciseID: this.state.exerciseID
    }
    const db = firebase.firestore();
    db.collection('exercise-entries').add(item);  
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
      margin: '32px',
      fontFamily: 'Roboto Mono',
      fontSize: '24px',
      color: '#040217',
      letterSpacing: 0,
      textAlign: 'center',
      width: '800px'
    }

    let buttonStyle = {
      width: '150px',
    }

    let finishedTextStyle = {
      margin: '32px',
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
          <Button text="I did it!" style={buttonStyle} onClick={this.handleClick}/>
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