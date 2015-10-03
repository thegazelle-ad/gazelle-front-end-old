import React from 'react';
import { Route } from 'react-router'
import AppComponent from './components/AppComponent.jsx'
import TestComponent from './components/TestComponent.jsx'

export default (
  <Route path="/" component={AppComponent}>
    <Route path="test" component={TestComponent} />
    <Route path=":initialCount" />
  </Route>
);
