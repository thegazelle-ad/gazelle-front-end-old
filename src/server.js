/* @flow */
import React from "react"
import express from "express"
import { Provider } from "react-redux"
import { storeFactory } from "./store.js"
import ReactDOMServer from "react-dom/server"
import { createStore, combineReducers, compose } from "redux"
import { Route, Routes, Router, RoutingContext, match } from "react-router"
import { routerStateReducer, ReduxRouter } from "redux-router"
import { routeReducer } from "redux-simple-router"
import createLocation from "history/lib/createLocation"

import App from "./components/App.jsx"
import Issue from "./components/Issue.jsx"
import Article from "./components/Article.jsx"
var location;
var server = express();
server.use(express.static('build'));

var port = process.env.PORT || 3000;

const reducer = function(state, action) {
  console.log("Reducer called");
  console.log(state);
  return state;
};

const store = createStore(reducer);

var routes = (
  <Route path="/" component={App}>
    <Route path="issues" component={Issue} />
      <Route path="issues/article" component={Article} />
  </Route>
);

server.get("*", (req, res) => {
  location = createLocation(req.url);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    var app = <Provider store={store}><RoutingContext {...renderProps} /></Provider>;
    var html = "<html><body><div id='root'>" +
             + ReactDOMServer.renderToString(app) +
             "</div><script src='/client.js'></script></body></html>";
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(html);
    } else {
      res.status(404).send('Not found')
    }
  });
});

server.listen(port, () => {
  console.log('Listening on port %d', port);
});