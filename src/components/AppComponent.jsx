import React, { Component } from 'react';
import CounterComponent from "./CounterComponent.jsx"
import { storeFactory } from "../store.js";
import { SET } from "../actions.js";

export default class AppComponent extends Component {
  render() {
    // Generate a store singleton
    var store = storeFactory();

    var initialCount = this.props.params.initialCount;

    store.dispatch({type: SET, value: parseInt(initialCount) });
    
    var count = this.props.count;
    return (
      <div>
        <h1>Hello World!</h1>
        <CounterComponent count={store.getState().get("count")} />
      </div>
    );
  }
}
