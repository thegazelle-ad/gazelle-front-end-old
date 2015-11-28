import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { pushState } from 'redux-router';

export default class App extends Component {
  render() {  
    return (
      <div>
        <h1>This is the App route.</h1>
        <Link to="/">Go to Home</Link>
        <Link to="/issues">Go to Issues</Link>
        <Link to="/issues/article">Go to Issues2</Link>
        {this.props.children}
      </div>
    );
  }
}
