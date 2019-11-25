const readline = require('readline');
const {
  showCommandsHelp,
  showBlockchainInfo,
  showNodeInfo,
  showTxInfo,
  showStakeState,
  showLeaderSchedules,
  showFragmentLogs,
  verifyConnection
} = require('./helpers');

const checkConnection = async nodeAddress => {
  console.log(`Connecting to ${nodeAddress}...`);
  const connected = await verifyConnection(nodeAddress);
  if (connected) {
    console.log('Connected!');
    console.log('Please input a command:');
    return true;
  }

  console.log(
    `Could not connect to ${nodeAddress}. Please check if this is the correct node REST address.`
  );

  return false;
};

const connectToNode = async restPort => {
  const nodeAddress = `http://localhost:${restPort}`;
  const couldConnect = await checkConnection(nodeAddress);

  if (couldConnect) {
    createInterface(nodeAddress);
  }
};

const commands = [
  { command: 'help', action: showCommandsHelp },
  { command: 'exit', action: ({ rl }) => rl.emit('SIGINT') },
  {
    command: 'chain-info',
    action: ({ nodeAddress }) => showBlockchainInfo(nodeAddress)
  },
  {
    command: 'node-info',
    action: ({ nodeAddress }) => showNodeInfo(nodeAddress)
  },
  { command: 'tx', action: ({ nodeAddress }) => showTxInfo(nodeAddress) },
  {
    command: 'stake-state',
    action: ({ nodeAddress }) => showStakeState(nodeAddress)
  },
  {
    command: 'leader-schedules',
    action: ({ nodeAddress }) => showLeaderSchedules(nodeAddress)
  },
  {
    command: 'fragment-logs(.*)?',
    action: async ({ nodeAddress, query }) => {
      if (!query) {
        console.log(
          'Missing fragment ID. Usage: `fragment-logs <fragment-id>`'
        );
        return;
      }
      await showFragmentLogs(nodeAddress, query);
    }
  }
];

const createInterface = nodeAddress => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'SPM > ',
    completer: line => {
      const completions = [
        'help',
        'chain-info',
        'node-info',
        'tx',
        'stake-state',
        'leader-schedules',
        'fragment-logs',
        'exit'
      ];
      const hits = completions.filter(c => c.startsWith(line));
      // Show all completions if none found
      return [hits.length ? hits : completions, line];
    }
  });
  rl.prompt();
  rl.on('line', async cmd => {
    const found = commands.find(c => new RegExp(c.command).test(cmd));
    if (found) {
      const query = new RegExp(found.command).exec(cmd)[1];
      await found.action({
        nodeAddress,
        query: query ? query.trim() : query,
        rl
      });
    } else {
      console.log(
        `${cmd} is not a valid command. Write 'help' to list all available commands`
      );
    }
    rl.prompt();
  });
  rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? (`yes` to exit) ', answer => {
      if (answer.match(/^y(es)?$/i)) {
        rl.close();
      } else {
        rl.resume();
        rl.prompt();
      }
    });
  });
  rl.on('close', () => console.log('')); // enter new line
};

module.exports = {
  checkConnection,
  connectToNode,
  createInterface
};
