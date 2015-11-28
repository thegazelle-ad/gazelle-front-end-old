/* @flow */
import React, { Component } from "react"
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from "redux"
import { Provider } from "react-redux"
import { Route, Routes, Router } from "react-router"
import {syncReduxAndRouter, routeReducer, UPDATE_PATH} from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
const { updatePath } = require ('redux-simple-router');



import App from "./components/App.jsx"
import Issue from "./components/Issue.jsx"
import Article from "./components/Article.jsx"
import { storeFactory } from "./store.js"

// Redux DevTools store enhancers
import {devTools, persistState} from 'redux-devtools';
// React components for Redux DevTools
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

const reducer = combineReducers(Object.assign({}, function(state, action) {
  console.log("Reducer called");
  console.log(state);
  return state;
  }, {
  routing: routeReducer
}));

const store = createStore(reducer);

const history = createBrowserHistory();

syncReduxAndRouter(history, store);

class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={App}>
              <Route path="issues" component={Issue}>
                <Route path="article" component={Article} />
              </Route>
            </Route>
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
console.log(store.getState());
console.log("Render complete")