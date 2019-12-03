import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, message } from 'antd';
import Loading from '../../../atoms/Loading/Loading';
import { getMessage } from '../../../../utils/messages';
import { formatDateTime } from '../../../../utils/formatters';
import { getBlockchainInfo } from '../../../../utils/api';
import './_style.scss';

const { Paragraph } = Typography;

const BlockchainInfo = ({ nodeAddress }) => {
  const [blockchainInfo, setBlockchainInfo] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      try {
        setLoading(true);
        const bcInfo = await getBlockchainInfo(nodeAddress);
        setBlockchainInfo(bcInfo);
      } catch (error) {
        message.error(getMessage('errors.api.generic'));
        setBlockchainInfo(undefined);
      }
    } else {
      setBlockchainInfo(undefined);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(nodeAddress);
  }, [nodeAddress]);

  return (
    <div className="card">
      <div className="titleCard">
        <h4>{getMessage('report.blockchain.title')}</h4>
      </div>
      {loading && <div>{getMessage('api.status.loading')}</div> 
      }
      {!blockchainInfo && !loading && (
        <Loading text={getMessage('api.status.loading')} /> //<div>{getMessage('api.status.noInfo')}</div> componente que no hay info
      )}
      {blockchainInfo && !loading && (
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
            <Paragraph ellipsis copyable>
              {blockchainInfo.block0Hash}
            </Paragraph>
            <p className="heightNode2">
              {formatDateTime(blockchainInfo.block0Time)}
            </p>
            <p className="heightNode2">{blockchainInfo.consensusVersion}</p>
          </div>
        </div>
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
