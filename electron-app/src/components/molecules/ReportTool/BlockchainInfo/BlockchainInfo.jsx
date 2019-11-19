import React from 'react';
import PropTypes from 'prop-types';
import { getMessage } from '../../../../utils/messages';

const BlockchainInfo = ({ block0, startedOn, consensus }) => (
  <div className="card">
    <div className="titleCard">
      <h4>{getMessage('report.blockchain.title')}</h4>
    </div>
    <div className="data">
      <div className="col1">
        <p>{getMessage('report.blockchain.block0')}</p>
        <p>{getMessage('report.blockchain.started')}</p>
        <p>{getMessage('report.blockchain.consensus')}</p>
      </div>
      <div className="col2">
        <p>{block0}</p>
        <p>{startedOn}</p>
        <p>{consensus}</p>
      </div>
    </div>
  </div>
);

BlockchainInfo.propTypes = {
  block0: PropTypes.string.isRequired,
  startedOn: PropTypes.string.isRequired,
  consensus: PropTypes.string.isRequired
};

export default BlockchainInfo;
