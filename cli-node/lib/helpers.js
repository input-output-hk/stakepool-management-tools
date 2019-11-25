const moment = require('moment-timezone');

const {
  getBlockchainInfo,
  getFragmentLogs,
  getLeaderSchedules,
  getNodeInfo,
  getStakeInfo,
  checkConnection
} = require('./api');

const {
  formatDateTime,
  formatDateTimeWithComma,
  formatTime,
  calculateTimeDifference
} = require('./formatters');

const calculateTotalValue = (stakeInfo, noUnassigned) => {
  if (!stakeInfo || !stakeInfo.stake) return 0;

  const dangling = stakeInfo.stake.dangling ? stakeInfo.stake.dangling : 0;
  const unassigned =
    !noUnassigned && stakeInfo.stake.unassigned
      ? stakeInfo.stake.unassigned
      : 0;

  let totalPools = 0;

  if (stakeInfo.stake.pools) {
    stakeInfo.stake.pools.forEach(pool => {
      totalPools += pool[1];
    });
  }

  const total = totalPools + dangling + unassigned;
  return total;
};

const calculateTotalStake = stakeInfo => calculateTotalValue(stakeInfo, true);

const formatSchedules = schedules =>
  schedules
    .sort(
      (a, b) =>
        moment(b.scheduled_at_time).format('YYYYMMDDHHmmss') -
        moment(a.scheduled_at_time).format('YYYYMMDDHHmmss')
    )
    .map(schedule => {
      const scheduleDate = `${formatDateTimeWithComma(
        schedule.scheduled_at_time
      )} (${schedule.scheduled_at_date})`;

      const startedAt = schedule.wake_at_time
        ? formatTime(schedule.wake_at_time)
        : 'TBD';

      const finishedAt = schedule.finished_at_time
        ? formatTime(schedule.finished_at_time)
        : 'TBD';

      return {
        schedule: scheduleDate,
        startedAt,
        finishedAt
      };
    });

const findFragments = (fragments, inputFragmentId) =>
  fragments
    .filter(fragment => fragment.fragment_id === inputFragmentId)
    .sort(
      (a, b) =>
        moment(b.last_updated_at).format('YYYYMMDDHHmmss') -
        moment(a.last_updated_at).format('YYYYMMDDHHmmss')
    )
    .map(fragment => {
      const fragmentId = fragment.fragment_id;
      const receivedAt = formatDateTimeWithComma(fragment.received_at);
      const updatedAt = formatDateTimeWithComma(fragment.last_updated_at);
      let { status } = fragment;

      if (status && status.Rejected) {
        status = status.Rejected.reason;
      } else if (status && status.InABlock) {
        status = status.InABlock.date;
      }

      return {
        fragmentId,
        receivedAt,
        updatedAt,
        status
      };
    });

const verifyConnection = nodeAddress => checkConnection(nodeAddress);

const showHelp = () => {
  console.log('spm 0.1.0');
  console.log('Stake Pool Management CLI toolkit');
  console.log('');
  console.log('USAGE:');
  console.log('\tspm [COMMAND]');
  console.log('COMMAND:');
  console.log(
    '\tsettings -p <node-rest-port>\testablish a connection with the local node'
  );
  console.log('\t\t\t\t\t<node-rest-port>: node REST listening port');
  console.log('\t-h, --help \t\t\tdisplays this help  message');
};

const showCommandsHelp = () => {
  console.log('Stake Pool Management CLI toolkit');
  console.log('');
  console.log('COMMANDS:');
  console.log(
    '\tchain-info \t\t\tdisplays Blockchain information: block0 hash, started on, consensus version'
  );
  console.log(
    '\tnode-info \t\t\tdisplays Node information: up since time, blocks received, last block, date, length'
  );
  console.log(
    '\ttx \t\t\t\tdisplays Transaction information: tx received, txs, outputs, fees'
  );
  console.log(
    '\tstake-state \t\t\tdisplays Stake state Information: total value, total stake'
  );
  console.log(
    '\tleader-schedules \t\tdisplays Leader schedules logs: schedule, started at, finished at'
  );
  console.log(
    '\tfragment-logs <fragment-id> \tdisplays fragment logs: fragment, received, uploaded, status'
  );
  console.log('\t\t\t\t\t<fragment-id>: well formed fragment id');
  console.log('\thelp \t\t\t\tdisplays this help message');
  console.log('\texit \t\t\t\texits the CLI');
};

const showBlockchainInfo = async nodeAddress => {
  const bcInfo = await getBlockchainInfo(nodeAddress);
  console.log('Blockchain Info: ', {
    block0: bcInfo.block0Hash,
    startedOn: formatDateTime(bcInfo.block0Time),
    consensus: bcInfo.consensusVersion
  });
};

const showNodeInfo = async nodeAddress => {
  const nodeInfo = await getNodeInfo(nodeAddress);
  console.log('Node Info: ', {
    upSince: formatDateTime(calculateTimeDifference(nodeInfo.uptime)),
    blocksReceived: nodeInfo.blockRecvCnt,
    lastBlock: nodeInfo.lastBlockHash,
    date: nodeInfo.lastBlockDate,
    length: nodeInfo.lastBlockHeight
  });
};

const showTxInfo = async nodeAddress => {
  const txInfo = await getNodeInfo(nodeAddress);
  console.log('Transaction Info: ', {
    txReceived: txInfo.txRecvCnt,
    txs: txInfo.lastBlockTx,
    outputs: txInfo.lastBlockSum,
    fees: txInfo.lastBlockFees
  });
};

const showStakeState = async nodeAddress => {
  const stakeInfo = await getStakeInfo(nodeAddress);
  const totalValue = calculateTotalValue(stakeInfo);
  const totalStake = calculateTotalStake(stakeInfo);
  const total = totalValue + totalStake;
  console.log('Stake State: ', {
    totalValue: `${totalValue} (${((totalValue * 100) / total).toFixed(2)} %)`,
    totalStake: `${totalStake} (${((totalStake * 100) / total).toFixed(2)} %)`
  });
};

const showLeaderSchedules = async nodeAddress => {
  const leaderSchedules = await getLeaderSchedules(nodeAddress);
  const formattedSchedules = formatSchedules(leaderSchedules);
  console.log('Leader Schedules: ');
  console.table(formattedSchedules);
};

const showFragmentLogs = async (nodeAddress, fragmentId) => {
  const fragmentLogs = await getFragmentLogs(nodeAddress);
  const foundFragments = findFragments(fragmentLogs, fragmentId);
  console.log('Fragment Logs: ');
  if (!foundFragments || foundFragments.length <= 0) {
    console.log(`Fragment ${fragmentId} not found.`);
  } else {
    console.table(foundFragments);
  }
};

module.exports = {
  showHelp,
  showCommandsHelp,
  showBlockchainInfo,
  showNodeInfo,
  showTxInfo,
  showStakeState,
  showLeaderSchedules,
  showFragmentLogs,
  verifyConnection
};
