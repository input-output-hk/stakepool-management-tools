import React from 'react';
import BlockchainInfo from '../../molecules/ReportTool/BlockchainInfo/BlockchainInfo';
import NodeInfo from '../../molecules/ReportTool/NodeInfo/NodeInfo';
import StakeInfo from '../../molecules/ReportTool/StakeInfo/StakeInfo';
import LeaderSchedules from '../../molecules/ReportTool/LeaderSchedules/LeaderSchedules';
import FragmentLogs from '../../molecules/ReportTool/FragmentLogs/FragmentLogs';

const ReportTab = () => (
  <div className="containerTab">
    <div className="rightColumn">
      <BlockchainInfo
        block0="000000000000000000000000000"
        startedOn="18:12:59 on 18:12:59"
        consensus="Genesis"
      />
      <NodeInfo
        uptime="18:12:59 on 18:12:59"
        blocksRcv={1}
        lastBlock="000000000000000000000000000"
        date="0.6"
        length={1}
        txRcv={0}
        txs={1}
        outputs={1}
        fees={0}
        onUpdate={() => console.log('UPDATING NODE INFO')}
      />
      <StakeInfo
        totalValue={2000}
        totalStake={2000}
        rewardsPending={2000}
        rewardsEarned={2000}
        onUpdate={() => console.log('UPDATING STAKE INFO')}
      />
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

export default ReportTab;
