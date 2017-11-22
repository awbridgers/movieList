import React, { Component } from 'react';

import './logIn.css';

export default class LogInComp extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div style = {{textAlign: "center", color: "white"}}>
        <h1>Select a sign in method:</h1>
        <p><button className = "googleButton" onClick = {() => this.props.google()}></button></p>
        <p><button className = 'facebookButton' onClick = {() => this.props.facebook()}></button></p>
        <p><button className = 'twitterButton' onClick ={() => this.props.twitter()}></button></p>
      </div>
    )
  }
}
