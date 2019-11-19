import React from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';

const NodeInfo = ({
  uptime,
  blocksRcv,
  lastBlock,
  date,
  length,
  txRcv,
  txs,
  outputs,
  fees,
  onUpdate
}) => (
  <div className="card">
    <div className="titleCard">
      <h4>{getMessage('report.node.title')}</h4>
    </div>
    <div className="data">
      <div className="col1">
        <p>{getMessage('report.node.uptime')}</p>
        <p>{getMessage('report.node.blocksRcv')}</p>
        <p>{getMessage('report.node.lastBlock')}</p>
        <p>{getMessage('report.node.date')}</p>
      </div>
      <div className="col2">
        <p>{uptime}</p>
        <p>{blocksRcv}</p>
        <p>{lastBlock}</p>
        <p>
          {date}/{length}
        </p>
      </div>
    </div>
    <div className="titleCard2">
      <h4>{getMessage('report.node.transactions.title')}</h4>
      <ButtonPrimary
        text={getMessage('report.node.transactions.update')}
        onClick={onUpdate}
      />
    </div>
    <div className="data">
      <div className="col1">
        <p>{getMessage('report.node.transactions.txRcv')}</p>
        <p>{getMessage('report.node.transactions.txs')}</p>
        <p>{getMessage('report.node.transactions.outputs')}</p>
        <p>{getMessage('report.node.transactions.fees')}</p>
      </div>
      <div className="col2">
        <p>{txRcv}</p>
        <p>{txs}</p>
        <p>{outputs}</p>
        <p>{fees}</p>
      </div>
    </div>
  </div>
);

NodeInfo.propTypes = {
  uptime: PropTypes.string.isRequired,
  blocksRcv: PropTypes.number.isRequired,
  lastBlock: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  txRcv: PropTypes.number.isRequired,
  txs: PropTypes.number.isRequired,
  outputs: PropTypes.number.isRequired,
  fees: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default NodeInfo;
