import React from 'react';

export default class Button extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      hovered: false,
    };
    this.buttonClicked = this.buttonClicked.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  buttonClicked (e) {
    if (typeof this.props.onClick !== "undefined") {
      this.props.onClick (e);
    }
  }

  onEnter (e) {
    if (e.key === 'Enter') {
      this.props.onEnter ();
    }
  }

  render () {
    let bColor = '#0F1E32';
    let tColor = '#FFFFFF';

    let buttonStyle = {
      cursor: 'pointer',
      borderRadius: 3,
      background: bColor,
      textTransform: 'uppercase',
      padding: '9px 20px 9px 20px',
      boxShadow: '1px 2px 1px rgba(0,0,0,0.50)',
      boxSizing: 'border-box',
      marginBottom: '1px',
      position: 'relative',
    };

    let textStyle = {
      color: tColor,
      fontFamily: 'Montserrat-SemiBold',
      fontSize: '14px',
      letterSpacing: '0',
      textAlign: 'center'
    }

    return (
      <div 
        style={{...buttonStyle, ...this.props.style}} 
        onClick={this.buttonClicked}
        onKeyPress={this.onEnter}
      > 
        <span style={textStyle}>
          {this.props.text}
        </span>
      </div>
    );
  }
}