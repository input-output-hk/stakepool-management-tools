import React from 'react';
import { getMessage } from '../../../utils/messages';

const WelcomeGuide = () => (
  <div>
    <img src="img/logo.png" alt="cardanoLogo" />
    <h4>{getMessage('welcome.guide.title')}</h4>
    <p>{getMessage('welcome.guide.subtitle')}</p>
    <ul>
      <li>
        <a
          href="https://staking.cardano.org/en/calculator"
          target="_blank"
          rel="noopener noreferrer"
        >
          {getMessage('welcome.guide.links.incentives')}
        </a>
      </li>
      <li>
        <a
          href="https://testnet.iohkdev.io/en/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {getMessage('welcome.guide.links.started')}
        </a>
      </li>
      <li>
        <a
          href="https://iohk.zendesk.com/hc/en-us"
          target="_blank"
          rel="noopener noreferrer"
        >
          {getMessage('welcome.guide.links.forums')}
        </a>
      </li>
      <li>
        <a
          href="https://shelleyexplorer.cardano.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {getMessage('welcome.guide.links.transaction')}
        </a>
      </li>
    </ul>
  </div>
);

export default WelcomeGuide;
