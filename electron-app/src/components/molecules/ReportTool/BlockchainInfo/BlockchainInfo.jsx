import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMessage } from '../../../../utils/messages';
import { formatDateTime } from '../../../../utils/formatters';
import { getBlockchainInfo } from '../../../../utils/api';
import './_style.scss';

const BlockchainInfo = ({ nodeAddress }) => {
  const [blockchainInfo, setBlockchainInfo] = useState();

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      const bcInfo = await getBlockchainInfo(nodeAddress);
      setBlockchainInfo(bcInfo);
    } else {
      setBlockchainInfo(undefined);
    }
  };

  useEffect(() => {
    fetchData(nodeAddress);
  }, [nodeAddress]);

  return (
    <div className="card">
      <div className="titleCard">
        <h4>{getMessage('report.blockchain.title')}</h4>
      </div>
      {blockchainInfo ? (
        <div className="data node node2">
          <div className="col1">
            <p className="heightNode">
              {getMessage('report.blockchain.block0')}
            </p>
            <p className="heightNode">
              {getMessage('report.blockchain.started')}
            </p>
            <p className="heightNode">
              {getMessage('report.blockchain.consensus')}
            </p>
          </div>
          <div className="col2">
            <p className="heightNode2 scroll">{blockchainInfo.block0Hash}</p>
            <p className="heightNode2">
              {formatDateTime(blockchainInfo.block0Time)}
            </p>
            <p className="heightNode2">{blockchainInfo.consensusVersion}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

BlockchainInfo.defaultProps = {
  nodeAddress: undefined
};

BlockchainInfo.propTypes = {
  nodeAddress: PropTypes.string
};

export default BlockchainInfo;
