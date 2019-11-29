# SPM CLI

### Install Dependencies

In project folder run:
```console
yarn install
```

### Usage/Run

In project folder run:
```console
yarn start [ARGS]
```

or `yarn link` and run with `spm [ARGS]`

ARGS:
  * `settings -p <node-rest-port>` establish a connection with the local node
    * `<node-rest-port>` node REST listening port (e.g, 3100)
  * `--help` displays help usage

Once connection is established, you can run these commands:
  * `chain-info` displays Blockchain information: block0 hash, started on, consensus version
  * `node-info` displays Node information: up since time, blocks received, last block, date, length
  * `tx` displays Transaction information: tx received, txs, outputs, fees
  * `stake-state` displays Stake state Information: total value, total stake
  * `leader-schedules` displays Leader schedules logs: schedule, started at, finished at
  * `fragment-logs <fragment-id>` displays fragment logs: fragment, received, uploaded, status
      * `<fragment-id>` well formed fragment id
  * `help` displays this help message
  * `exit` exits the CLI

### Building package and Installation

* Install production dependencies: `yarn install --prod`

* Create distribution package (spm-v0.1.0.tgz): `yarn pack`

> **NOTE**: you can also omit these two previous steps by using the `build` script located in the `package.json` file by running `yarn run build`.

* Install spm globally: `npm install -g spm-v0.1.0.tgz`