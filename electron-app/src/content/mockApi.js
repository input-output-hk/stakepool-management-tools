export const blockchainInfo = {
  block0Hash:
    '1ab1f93bedc03e0536d75469360aa1b012ba2ffb498e96f474f573aafe28f118',
  block0Time: '2019-11-19T17:42:54+00:00',
  consensusVersion: 'genesis',
  currSlotStartTime: '2019-11-19T18:48:04+00:00',
  fees: {
    certificate: 0,
    coefficient: 0,
    constant: 10
  },
  maxTxsPerBlock: 255,
  slotDuration: 10,
  slotsPerEpoch: 5000
};

export const nodeInfo = {
  blockRecvCnt: 40,
  lastBlockDate: '0.393',
  lastBlockFees: 0,
  lastBlockHash:
    'b2b70c8b3ab666df125a776f14dde9509e42ea4ae1878f5ca54851842f6bc7e0',
  lastBlockHeight: '40',
  lastBlockSum: 0,
  lastBlockTime: '2019-11-20T13:56:08+00:00',
  lastBlockTx: 0,
  state: 'Running',
  txRecvCnt: 0,
  uptime: 3971
};

export const leaderSchedules = [
  {
    created_at_time: '2019-08-19T12:25:00.417263555+00:00',
    scheduled_at_time: '2019-08-19T23:18:35+00:00',
    scheduled_at_date: '0.3923',
    wake_at_time: null,
    finished_at_time: null,
    enclave_leader_id: 1,
    status: 'Pending'
  },
  {
    created_at_time: '2019-08-19T12:25:00.417263555+00:00',
    scheduled_at_time: '2019-08-19T23:18:35+00:00',
    scheduled_at_date: '0.3923',
    wake_at_time: '2019-08-19T23:18:35.001254555+00:00',
    finished_at_time: '2019-08-19T23:19:05.010113333+00:00',
    enclave_leader_id: 1,
    status: {
      Block: {
        chain_length: 201910,
        block:
          'd9040ca57e513a36ecd3bb54207dfcd10682200929cad6ada46b521417964174'
      }
    }
  },
  {
    created_at_time: '2019-08-19T12:25:00.417263555+00:00',
    scheduled_at_time: '2019-08-19T23:18:35+00:00',
    scheduled_at_date: '0.3923',
    wake_at_time: '2019-08-19T23:18:35.001254555+00:00',
    finished_at_time: '2019-08-19T23:19:05.010113333+00:00',
    enclave_leader_id: 1,
    status: {
      Rejected: {
        reason: 'Missed the deadline to compute the schedule'
      }
    }
  }
];

export const stakeInfo = {
  epoch: 0,
  stake: {
    dangling: 10000000,
    pools: [
      [
        'd882fc32c4b4b901cb29dfb4162e070d7650e937abb7bc2947d3a7d48b6c86a6',
        2000000000000
      ],
      [
        'd882fc32c4b4b901cb29dfb4162e070d762ee937abb7bc2947d3a7d48b6c86a6',
        6000000000000
      ]
    ],
    unassigned: 12323465894720
  }
};
