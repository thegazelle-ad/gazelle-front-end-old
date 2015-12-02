/* @flow */
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import React, { Component } from "react"
import { Route, Routes, Router } from "react-router"
const { updatePath } = require ("redux-simple-router");
import { createStore, combineReducers, compose } from "redux"
import createBrowserHistory from "history/lib/createBrowserHistory"
import {syncReduxAndRouter, routeReducer, UPDATE_PATH} from "redux-simple-router"

import App from "./components/App.jsx"
import Issue from "./components/Issue.jsx"
import Article from "./components/Article.jsx"
import { storeFactory } from "./store.js"

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