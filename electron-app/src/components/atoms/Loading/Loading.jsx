import React from 'react';
import { Icon } from 'antd';
import './_style.scss';

const Loading = ({ text }) => (
  <div className="LoadingIcon">
    <Icon type="loading" spin/>
    <p>{text}</p>
  </div>
);

export default Loading;
