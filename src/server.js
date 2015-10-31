/* @flow */

import React from "react"
import express from "express"
import App from "./components/App.jsx"
import Issue from "./components/Issue.jsx"
import Article from "./components/Article.jsx"
import { Provider } from "react-redux"
import { storeFactory } from "./store.js"
import { SET_LOCATION } from "./actions.js"
import ReactDOMServer from "react-dom/server"
import { Route, Routes, Router } from "react-router"
import { combineReducers, compose, createStore } from "redux";
import { reduxReactRouter, match } from 'redux-router/server';
import { routerStateReducer, ReduxRouter } from 'redux-router';

var server = express();

var port = process.env.PORT || 3000;

var routes = (
  <Route path="/" component={App}>
    <Route path="issues" component={Issue} />
      <Route path="issues/articles" component={Article} />
  </Route>
);

const reducer = combineReducers({
  router: routerStateReducer
});

server.get("*", (req, res) => {
  const store = compose(
    reduxReactRouter({
      routes
    })
  )(createStore)(reducer);

  store.dispatch(match(req.url, (error, redirectLocation, renderProps) => {
    // var app = <div>"Hello"</div>
    var app = <Provider store={store}><ReduxRouter {...renderProps} /></Provider>;
    console.log(store.getState());
    var html = ReactDOMServer.renderToString(app);
    res.status(200).send(html);
  }));
});

server.listen(port, () => {
  console.log('Listening on port %d', port);
});