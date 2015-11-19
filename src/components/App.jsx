import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { pushState } from 'redux-router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    console.log("GOt a click");
    const { dispatch } = this.props;

    dispatch(pushState(null, '/Issues'));
  }

  render() {  
    return (
      <div>
        <h1>This is the App route.</h1>
        {this.props.children}
        <a href="#">Go to Issues</a>
      </div>
    );
  }
}
