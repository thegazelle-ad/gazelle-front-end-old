/* @flow */

import express from "express"
import { storeFactory } from "./store.js"
import { SET_LOCATION } from "./actions.js"
import React from 'react'
import MainComponent from "./MainComponent.jsx";
import AppComponent from "./components/AppComponent.jsx"
import { Route, Routes, Router } from 'react-router'
import { RoutingContext, match } from 'react-router'

import createLocation from 'history/lib/createLocation'
import { renderToString } from 'react-dom/server'

var app = express();

var port = process.env.PORT || 3000;

const routes = (
  <Route path="/" component={AppComponent}>
  </Route>
);

app.get("/", (req, res) => {
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