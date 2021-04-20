import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Welcome from './Welcome';
import App from './App';
import Lesson from './Lesson';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage';
import Quiz from './Quiz';
import About from './About';
import Dictionary from './Dictionary'
import { Route, BrowserRouter, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Switch>

        <Route path="/about">
            <About></About>
          </Route>
          <Route path="/dictionary">
           <Dictionary></Dictionary>
          </Route>
          <Route path="/home">
            <HomePage></HomePage>
          </Route>
          <Route path="/lesson/:lid">
            <Lesson></Lesson>
          </Route>
          <Route path="/">
            <Welcome />
          </Route>

        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
