import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import { getNodeInfo } from '../../../../utils/api';
import { formatDateTime } from '../../../../utils/formatters';
import './_style.scss';

const NodeInfo = ({ nodeAddress }) => {
  const [nodeInfo, setNodeInfo] = useState();

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      const nodeStats = await getNodeInfo(nodeAddress);
      setNodeInfo(nodeStats);
    } else {
      setNodeInfo(undefined);
    }
  };

  useEffect(() => {
    fetchData(nodeAddress);
  }, [nodeAddress]);

  return (
    <div className="card">
      <div className="titleCard">
        <h4>{getMessage('report.node.title')}</h4>
      </div>

      {nodeInfo ? (
        <div>
          <div className="data node node2">
            <div className="col1">
              <p className="heightNode">{getMessage('report.node.uptime')}</p>
              <p className="heightNode">
                {getMessage('report.node.blocksRcv')}
              </p>
              <p className="heightNode">
                {getMessage('report.node.lastBlock')}
              </p>
              <p className="heightNode">{getMessage('report.node.date')}</p>
            </div>
            <div className="col2">
              <p className="heightNode2">{formatDateTime(nodeInfo.uptime)}</p>
              <p className="heightNode2">{nodeInfo.blockRecvCnt}</p>
              <p className="heightNode2 scroll">{nodeInfo.lastBlockHash}</p>
              <p className="heightNode2">
                {nodeInfo.lastBlockDate}/{nodeInfo.lastBlockHeight}
              </p>
            </div>
          </div>
          <div className="titleCard2">
            <h4>{getMessage('report.node.transactions.title')}</h4>
            <ButtonPrimary
              text={getMessage('report.node.transactions.update')}
              onClick={fetchData}
            />
          </div>
          <div className="data node node2">
            <div className="col1">
              <p className="heightNode">
                {getMessage('report.node.transactions.txRcv')}
              </p>
              <p className="heightNode">
                {getMessage('report.node.transactions.txs')}
              </p>
              <p className="heightNode">
                {getMessage('report.node.transactions.outputs')}
              </p>
              <p className="heightNode">
                {getMessage('report.node.transactions.fees')}
              </p>
            </div>
            <div className="col2">
              <p className="heightNode2">{nodeInfo.txRecvCnt}</p>
              <p className="heightNode2">{nodeInfo.lastBlockTx}</p>
              <p className="heightNode2">{nodeInfo.lastBlockSum}</p>
              <p className="heightNode2">{nodeInfo.lastBlockFees}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

NodeInfo.defaultProps = {
  nodeAddress: undefined
};

NodeInfo.propTypes = {
  nodeAddress: PropTypes.string
};

export default NodeInfo;
