import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { getMessage } from '../../../utils/messages';

const WelcomeGuide = ({ onCheck }) => (
  <div>
    <img src="img/logo.png" alt="cardanoLogo" />
    <h4>{getMessage('welcome.guide.title')}</h4>
    <p>{getMessage('welcome.guide.subtitle')}</p>
    <ul>
      <li>{getMessage('welcome.guide.links.incentives')}</li>
      <li>{getMessage('welcome.guide.links.started')}</li>
      <li>{getMessage('welcome.guide.links.forums')}</li>
      <li>{getMessage('welcome.guide.links.transaction')}</li>
    </ul>
    <Checkbox className="checkbox" onChange={onCheck}>
      {getMessage('welcome.guide.check')}
    </Checkbox>
  </div>
);

WelcomeGuide.propTypes = {
  onCheck: PropTypes.func.isRequired
};

export default WelcomeGuide;
