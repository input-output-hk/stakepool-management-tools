import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, message } from 'antd';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import StatusMessage from '../../../atoms/StatusMessage/StatusMessage';
import { getMessage } from '../../../../utils/messages';
import { getNodeInfo } from '../../../../utils/api';
import {
  formatDateTime,
  calculateTimeDifference
} from '../../../../utils/formatters';
import './_style.scss';

const { Paragraph } = Typography;

const NodeInfo = ({ nodeAddress }) => {
  const [nodeInfo, setNodeInfo] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      try {
        setLoading(true);
        const nodeStats = await getNodeInfo(nodeAddress);
        setNodeInfo(nodeStats);
      } catch (error) {
        message.error(getMessage('errors.api.generic'));
        setNodeInfo(undefined);
      }
    } else {
      setNodeInfo(undefined);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(nodeAddress);
  }, [nodeAddress]);

  return (
    <div className="card">
      <div className="titleCard">
        <h4>{getMessage('report.node.title')}</h4>
        <ButtonPrimary
          text={getMessage('report.node.transactions.update')}
          onClick={fetchData}
        />
      </div>
      {loading && <StatusMessage status="loading" />}
      {!loading && !nodeInfo && <StatusMessage status="noInfo" />}
      {!loading && nodeInfo && (
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
              <p className="heightNode2">
                {formatDateTime(calculateTimeDifference(nodeInfo.uptime))}
              </p>
              <p className="heightNode2">{nodeInfo.blockRecvCnt}</p>
              <Paragraph copyable>{nodeInfo.lastBlockHash}</Paragraph>
              <p className="heightNode2">
                {nodeInfo.lastBlockDate}/{nodeInfo.lastBlockHeight}
              </p>
            </div>
          </div>
          <div className="titleCard2">
            <h4>{getMessage('report.node.transactions.title')}</h4>
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
