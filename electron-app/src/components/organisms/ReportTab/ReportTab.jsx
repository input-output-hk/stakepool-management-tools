import React from 'react';
import PropTypes from 'prop-types';
import BlockchainInfo from '../../molecules/ReportTool/BlockchainInfo/BlockchainInfo';
import NodeInfo from '../../molecules/ReportTool/NodeInfo/NodeInfo';
import StakeInfo from '../../molecules/ReportTool/StakeInfo/StakeInfo';
import LeaderSchedules from '../../molecules/ReportTool/LeaderSchedules/LeaderSchedules';
import FragmentLogs from '../../molecules/ReportTool/FragmentLogs/FragmentLogs';

const ReportTab = ({ nodeAddress }) => (
  <div className="containerTab">
    <div className="rightColumn">
      <BlockchainInfo nodeAddress={nodeAddress} />
      <NodeInfo nodeAddress={nodeAddress} />
      <StakeInfo nodeAddress={nodeAddress} />
    </div>
    <div className="rightColumn">
      <LeaderSchedules />
      <FragmentLogs
        fragments={[]}
        currentPage={1}
        totalPages={1}
        onSearch={() => console.log('FILTERING FRAGMENTS')}
        onBackPage={() => console.log('GO PREVIOUS PAGE')}
        onNextPage={() => console.log('GO NEXT PAGE')}
      />
    </div>
  </div>
);

ReportTab.defaultProps = {
  nodeAddress: undefined
};

ReportTab.propTypes = {
  nodeAddress: PropTypes.string
};

export default ReportTab;
