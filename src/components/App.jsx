import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

export default class App extends Component {
  render() {  
    return (
      <div>
        <h1>This is the App route.</h1>
        {this.props.children}
      </div>
    );
  }
}
