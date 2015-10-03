import { createStore } from 'redux';
import Immutable from 'immutable';

function reducer(state, action) {
  switch(action.type) {
    case "INCREMENT":
      return state.set("count", state.get("count") + 1);
    case "DECREMENT":
      return state.set("count", state.get("count") - 1);
    case "SET":
      return state.set("count", action.value);
  }
  return state;
}

export function storeFactory(initialState = Immutable.Map({count: 0})) {
  return createStore(reducer, initialState);
}
