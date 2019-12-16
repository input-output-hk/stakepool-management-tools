const util = require('util');
const fs = require('fs');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

marked.setOptions({
  renderer: new TerminalRenderer()
});

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
  calculateTimeDifference,
  calculateTotalStake,
  calculateTotalValue,
  findFragments,
  formatSchedules
} = require('./formatters');

const { infoSections, tosAgreementContent } = require('./content');

const TABLE_SIZE = 250;

const verifyConnection = nodeAddress => checkConnection(nodeAddress);

const showTOSAgreement = callback => {
  fs.readFile(tosAgreementContent, { encoding: 'utf8' }, (err, data) => {
    if (err) return console.log(err);
    console.log(marked(data));
    if (callback) callback();
  });
};

const showInfoSections = () => {
  console.log('spm 0.1.1');
  console.log('Stake Pool Management CLI toolkit');
  console.log('');
  console.log('Get Started:');
  Object.values(infoSections).forEach(({ topic }) => console.log(topic));
  console.log('');
  console.log(
    'Run `spm --info [topic number]` to display the information about the chosen topic'
  );
};

const showInfoContent = option =>
  fs.readFile(
    infoSections[option].content,
    { encoding: 'utf8' },
    (err, data) => {
      if (err) return console.error(err);
      console.log(marked(data));
    }
  );

const showHelp = () => {
  console.log('spm 0.1.1');
  console.log('Stake Pool Management CLI toolkit');
  console.log('');
  console.log('USAGE:');
  console.log('\tspm [COMMAND]');
  console.log('COMMAND:');
  console.log(
    '\tsettings -p <node-rest-port>\testablish a connection with the local node'
  );
  console.log('\t\t\t\t\t<node-rest-port>: node REST listening port');
  console.log(
    '\t-i, --info <topic-number>\tdisplays information on how to set up a stake pool'
  );
  console.log('\t\t\t\t\t<topic-number>: topic to display information about');
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
    '\ttx \t\t\t\tdisplays Transaction information: total txs received, txs in last block, outputs in last block, fees in last block'
  );
  console.log(
    '\tstake-state \t\t\tdisplays Stake state Information: total value, total stake'
  );
  console.log(
    '\tleader-schedules \t\tdisplays last 250 Leader schedules logs: schedule, started at, finished at'
  );
  console.log(
    '\tfragment-logs [fragment-id] \tdisplays last 250 fragment logs: fragment, received, uploaded, status'
  );
  console.log('\t\t\t\t\t[fragment-id]: well formed fragment id');
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
    totalTxsReceived: txInfo.txRecvCnt,
    txsInLastBlock: txInfo.lastBlockTx,
    outputsInLastBlock: txInfo.lastBlockSum,
    feesInLastBlock: txInfo.lastBlockFees
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
  const formattedSchedules = formatSchedules(leaderSchedules, TABLE_SIZE);
  console.log('Leader Schedules: ');
  if (!formattedSchedules || formattedSchedules.length <= 0) {
    console.log('Leader schedules not found.');
  } else {
    console.table(formattedSchedules);
  }
};

const showFragmentLogs = async (nodeAddress, fragmentId) => {
  const fragmentLogs = await getFragmentLogs(nodeAddress);
  const foundFragments = findFragments(fragmentLogs, fragmentId, TABLE_SIZE);
  console.log('Fragment Logs: ');
  if (!foundFragments || foundFragments.length <= 0) {
    console.log('Fragment logs not found.');
  } else {
    console.log(
      util.inspect(foundFragments, { maxArrayLength: TABLE_SIZE, colors: true })
    );
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
  verifyConnection,
  showInfoContent,
  showInfoSections,
  showTOSAgreement
};
