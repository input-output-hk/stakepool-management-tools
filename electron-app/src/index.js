import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/pages/home/Home';
import 'antd/dist/antd.css';

ReactDOM.render(
  <div>
    <Home />
  </div>,
  document.getElementById('app')
);

module.hot.accept();
