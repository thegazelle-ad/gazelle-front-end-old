/* @flow */

import express from "express";
import { SET_LOCATION } from "./actions.js";
import React from 'react';

import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import routes from './routes'

var app = express();

var port = process.env.PORT || 3000;

app.get("*", (req, res) => {
  var location = createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    res.send(
      React.renderToString(
        <RoutingContext {...renderProps} />
      )
    );
  });

  // Generate a store singleton
  //var store = storeFactory();

  //// Dispatch the action
  //store.dispatch({ type: SET_LOCATION, value: location })

  //// Render the component serverside
  //var mainComponent = <MainComponent/>
  //res.send(
    //React.renderToString(mainComponent)
  //);
});

var server = app.listen(port, () => {
  console.log('Listening on port %d', port);
})
