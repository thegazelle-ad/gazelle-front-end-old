import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

export default class Issue extends Component {
  render() {  
    return (
      <div>
        <h1>This is the Issue route.</h1>
      </div>
    );
  }
}
