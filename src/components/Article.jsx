import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

export default class Article extends Component {
  render() {  
    return (
      <div>
        <h1>This is the Article route.</h1>
      </div>
    );
  }
}
