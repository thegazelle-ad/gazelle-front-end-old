/* @flow */

import express from "express";

var app = express();

var port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

var server = app.listen(port, () => {
  console.log('Listening on port %d', port);
})

var x = 1;
var y = (x: string) => {
  return x + "";
}

y(x);
