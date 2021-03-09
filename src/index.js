import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Welcome from './Welcome';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage';

ReactDOM.render(
  <React.StrictMode>
    <body>
      <HomePage></HomePage>
      {/* <Welcome/> */}
      {/* <App/> */}
    </body>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
