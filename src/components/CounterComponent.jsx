import React, { Component } from 'react';

export default class CounterComponent extends Component {
  render() {
    var count = this.props.count;
    return (
      <div>
        <div>Counter {count ? count : 0}</div>
      </div>
    );
  }
}
