import React from 'react';

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = { 
      time: new Date() 
    };
  }

  componentDidMount() { 
    this.update = setInterval(() => {
      this.setState({
        time: new Date() 
      });
    }, 1000); 
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }


  render() {
    let { time } = this.state; // retrieve the time from state

    let timeSyle = {
      'fontFamily': 'Montserrat-Bold',
      'fontSize': '60px',
      'color': '#040217',
      'letterSpacing': 0,
      'textAlign': 'center',
      'margin': '20px'
    };

    let textSyle = {
      'fontFamily': 'Montserrat-SemiBold',
      'fontSize': '32px',
      'color': '#040217',
      'letterSpacing': 0,
      'textAlign': 'center',
      'margin': '5px'
    };

    let text = "You're awesome, Shreya!"

    return (
      <div>
          <div style={{'height': '100px'}}></div>
          <div style={timeSyle}>{time.toLocaleTimeString()}</div>
          <div style={textSyle}>{text}</div>
          <div style={{'height': '50px'}}></div>
      </div>
    );
  }
}