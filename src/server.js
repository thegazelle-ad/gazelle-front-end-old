/* @flow */

import express from "express";
import { storeFactory } from "./store.js";
import { SET_LOCATION } from "./actions.js";
import React from 'react';
import MainComponent from "./MainComponent.jsx";

var app = express();

var port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  var location = req.query.location;

  // Generate a store singleton
  var store = storeFactory();

  // Dispatch the action
  store.dispatch({ type: SET_LOCATION, value: location })

  // Render the component serverside
  var mainComponent = <MainComponent location={store.getState().get("location")} />
  res.send(
    React.renderToString(mainComponent)
  );
});

var server = app.listen(port, () => {
  console.log('Listening on port %d', port);
})
