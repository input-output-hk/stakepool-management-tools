import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/pages/home/Home';

ReactDOM.render(
  <div>
    <Home />
  </div>,
  document.getElementById('app')
);

module.hot.accept();
