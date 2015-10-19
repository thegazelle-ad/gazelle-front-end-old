/* @flow */

import express from "express"
import { storeFactory } from "./store.js"
import { SET_LOCATION } from "./actions.js"
import React from "react"
import App from "./components/App.jsx"
import Issue from "./components/Issue.jsx"
import Article from "./components/Article.jsx"
import { Route, Routes, Router } from "react-router"
import { RoutingContext, match } from "react-router"
import createLocation from 'history/lib/createLocation'
import createHistory from 'history/lib/createBrowserHistory';
import { renderToString } from 'react-dom/server'

var app = express();

var port = process.env.PORT || 3000;

var routes = (
  <Route path="/" component={App}>
    <Route path="issues" component={Issue} />
      <Route path="issues/articles" component={Article} />
  </Route>
);

app.get("*", (req, res) => {
  var location = createLocation(req.url);
  console.log(location, routes);
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    console.log(renderProps);
    console.log(<RoutingContext {...renderProps} />);
    
    res.send(React.renderToString(<RoutingContext {...renderProps} />))
  })


  // // Generate a store singleton
  // var store = storeFactory();

  // // Dispatch the action
  // store.dispatch({ type: SET_LOCATION, value: location })


  // // Render the component serverside
  // var mainComponent = <MainComponent location={store.getState().get("location")} />
  // Router.renderRoutesToString(
  //   <Routes initialPath="/" location="history">
  //     {routes}
  //   </Routes>
  // , req.url, req.query).then((data) => {
  //   res.send(data.html);
  // })
});

var server = app.listen(port, () => {
  console.log('Listening on port %d', port);
})
// 