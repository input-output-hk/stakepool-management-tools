import { get } from 'lodash';

const messages = {
  report: {
    blockchain: {
      block0: 'Block0',
      consensus: 'Consensus',
      started: 'Started On',
      title: 'Blockchain Info'
    },
    fragments: {
      columns: {
        fragment: 'Fragment',
        received: 'Received',
        updated: 'Updated',
        status: 'Status'
      },
      missing: 'Please enter a Fragment ID',
      pagination: {
        back: '<<',
        next: '>>',
        current: 'Page ',
        total: ' of '
      },
      search: {
        placeholder: 'Enter Fragment ID',
        update: 'Update'
      },
      title: 'Fragment Logs'
    },
    leader: {
      columns: {
        finished: 'Finished At',
        schedule: 'Schedule',
        started: 'Started At'
      },
      pagination: {
        back: '<<',
        next: '>>',
        current: 'Page ',
        total: ' of '
      },
      title: 'Leader Schedules',
      update: 'Update',
      missing: 'No logs found'
    },
    node: {
      blocksRcv: 'Blocks Received',
      date: 'Date / Length',
      lastBlock: 'Last Block',
      title: 'Node Info',
      transactions: {
        title: 'Transactions',
        update: 'Update',
        txRcv: 'Tx Received',
        txs: 'Txs',
        outputs: 'Outputs',
        fees: 'Fees'
      },
      uptime: 'Up Since'
    },
    stake: {
      rewardsEarned: 'Rewards Earned',
      rewardsPending: 'Rewards Pending',
      title: 'Stake State and Rewards',
      totalValue: 'Total Value',
      totalStake: 'Total Stake',
      update: 'Update'
    }
  },
  tabs: {
    report: 'Report Tool',
    welcome: 'Welcome'
  },
  welcome: {
    getStarted: {
      title: 'Get Started'
    },
    guide: {
      check: 'Show Welcome Guide when opening app',
      links: {
        forums: 'Help Forums',
        incentives: 'Understand Incentives',
        started: 'Get Started Guide',
        transaction: 'Check a Transaction'
      },
      subtitle: 'Welcome Stake Pool Operators, to begin please visit:',
      title: 'Stake Pool Manager'
    },
    nodeInput: {
      button: 'Connect',
      description:
        'To use Report Tool, enter node REST address and Port Number.',
      placeholder: 'For example http://localhost:8080'
    }
  }
};

export const getMessage = stringKeys => {
  const message = get(messages, stringKeys);
  return typeof message === 'string' ? message : stringKeys;
};
