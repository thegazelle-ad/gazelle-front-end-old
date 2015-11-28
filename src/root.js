import React from 'react';
import {Route} from 'react-router';
import {App, Issue, Article} from './components';


export default function getRoutes() {
  return (
    <div>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="issues" component={Issue}>
              <Route path="issues/articles" component={Article} />
            </Route>
          </Route>
        </Route>
      </Provider>
    </div>
  );
}