# SPM CLI

## Linux

### Run

In Linux folder:
- Give execution permissions to script with `chmod -x spm.sh`
- Run `./spm.sh`

Show help: `./spm.sh --help`

Usage:
`./spm.sh <option> <addr>`

`<option>` can be:
- `chainInfo` → block 0, started on, consensus
- `nodeInfo` → up since, blocks received, last block, date/length
- `tx` → tx received, txs, outputs, fees
- `stakeState` → total value, total stake
- `rewards` → rewards pending, rewards earned
- `leaderSchedule` → schedule, started at, finished at
- `frag <well formed fragment id>` → fragment, received, uploaded, status

`<addr>` Node API address. E.g. http://127.0.0.1:8443

## Windows

> TODO