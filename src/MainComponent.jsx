import React, { Component } from 'react';

export default class MainComponent extends Component {
  render() {
    let location = this.props.location;
    return (
      <div>
        <h1>Hello World!</h1>
        <div>{location ? location : "No location param received"}</div>
      </div>
    );
  }
}
