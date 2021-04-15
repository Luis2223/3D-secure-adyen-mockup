import React from 'react';
import ReactDOM from 'react-dom';
import "@adyen/adyen-web/dist/adyen.css";
import './css/index.css';
import Home from './pages/home';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

