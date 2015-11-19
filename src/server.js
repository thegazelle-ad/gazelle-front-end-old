/* @flow */

import React from "react"
import http from "http"
import express from "express"
import App from "./components/App.jsx"
import Issue from "./components/Issue.jsx"
import Article from "./components/Article.jsx"
import { Provider } from "react-redux"
import { storeFactory } from "./store.js"
import { SET_LOCATION } from "./actions.js"
import ReactDOMServer from "react-dom/server"
import { Route, Routes, Router } from "react-router"
import { combineReducers, compose, createStore } from "redux"
import { reduxReactRouter, match } from 'redux-router/server'
import { routerStateReducer, ReduxRouter } from 'redux-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import createLocation from 'history/lib/createLocation'


var server = express();

var port = process.env.PORT || 3000;

var routes = (
  <Route path="/" component={App}>
    <Route path="issues" component={Issue} />
      <Route path="issues/articles" component={Article} />
  </Route>
);

console.log("Here is memoryHistory");
console.log(createMemoryHistory)

const reducer = combineReducers({
  router: routerStateReducer
});

server.use(express.static('build'));

server.get("*", (req, res) => {
  const store = compose(
    reduxReactRouter({
      routes: routes,
      createHistory: createMemoryHistory
    })
  )(createStore)(reducer);

  const location = createLocation(req.url);
  console.log("Here are details");
  console.log(store);
  console.log(req.url);
  console.log(location);

  store.dispatch(match(location, (error, redirectLocation, renderProps) => {
    var app = <Provider store={store}><ReduxRouter {...renderProps} /></Provider>;
    console.log(store.getState());
    // var html = ReactDOMServer.renderToString(app);
    var html = "<html><body><div id='root'></div><script src='/client.js'></script>"
             + ReactDOMServer.renderToString(app) + "</body></html>";
    res.status(200).send(html);
  }));
});

server.listen(port, () => {
  console.log('Listening on port %d', port);
});

