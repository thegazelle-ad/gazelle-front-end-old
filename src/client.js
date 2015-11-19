/* @flow */
console.log('client started loading');

import React, { Component } from "react"
import App from "./components/App.jsx"
import Issue from "./components/Issue.jsx"
import Article from "./components/Article.jsx"
import { Provider } from "react-redux"
import createHistory from 'history/lib/createBrowserHistory'
import { storeFactory } from "./store.js"
// import ReactDOMServer from "react-dom/server"
import { Route, Routes, Router } from "react-router"
import { combineReducers, compose, createStore } from "redux"
import { reduxReactRouter, match } from 'redux-router'
import { routerStateReducer, ReduxRouter } from 'redux-router'
import ReactDOM from 'react-dom';


const routes = (
  <Route path="/" component={App}>
    <Route path="issues" component={Issue}>
      <Route path="issues/articles" component={Article} />
    </Route>
  </Route>
);

const reducer = combineReducers({
  router: routerStateReducer
});

const store = compose(
  reduxReactRouter({
    routes,
    createHistory
  })
)(createStore)(reducer);

// var routes = (
//   <div>
//     <Provider store={store}>
//       <ReduxRouter>
//         <Route path="/" component={App}>
//           <Route path="issues" component={Issue}>
//             <Route path="issues/articles" component={Article} />
//           </Route>
//         </Route>
//       </ReduxRouter>
//     </Provider>
//   </div>
// );



// store.dispatch(match(req.url, (error, redirectLocation, renderProps) => {
//   // var app = <div>"Hello"</div>
//   var app = <Provider store={store}><ReduxRouter {...renderProps} /></Provider>;
//   console.log(store.getState());
//   var html = ReactDOMServer.renderToString(app);
// }));

class Root extends Component {
  render() {
    return (
      <div>
          <Provider store={store}>
            <ReduxRouter />
          </Provider>
        </div>
    );
  }
}

console.log(createHistory);
ReactDOM.render(<Root />, document.getElementById('root'));
console.log("Render complete")