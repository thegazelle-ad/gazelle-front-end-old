import React from "react"
import { createStore } from 'redux';
import Immutable from 'immutable';

function reducer(
  state = Immutable.Map({location: ''}),
  action) {
  switch(action.type) {
    case 'SET_LOCATION':
      return state.set("location", action.value);
  }
}

export function storeFactory() {
  return createStore(reducer);
}
