import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import 'antd/dist/antd.css';
import '../public/app.scss';

ReactDOM.render(
  <div>
    <Home />
  </div>,
  document.getElementById('app')
);

module.hot.accept();
