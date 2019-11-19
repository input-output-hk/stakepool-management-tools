#!/bin/bash

OPTION=$1
ARG=$2

if [ $# -lt 1  -o $# -gt 2 ]; then
  echo "Show usage"
  exit 1
fi

if [ $OPTION == '--help' ]; then
  echo "Get started info"
  exit 0
fi

case $OPTION in
  chainInfo)
  echo "block 0, started on, consensus"
  ;;
  nodeInfo)
  echo "up since, blocks received, last block, date/length"
  ;;
  tx)
  echo "tx received, txs, outputs, fees"
  ;;
  stakeState)
  echo "total value, total stake"
  ;;
  rewards)
  echo "rewards pending, rewards earned"
  ;;
  leaderSchedule)
  echo "schedule, started at, finished at"
  ;;
  frag)
  if [ $# -lt 2 ]; then
    echo "Please enter a fragment ID: spm frag <fragment-id>"
    exit 1
  fi
  echo "fragment, received, uploaded, status"
  ;;
  tx)
  echo "tx received, txs, outputs, fees"
  ;;
  *)
  echo "show usage"
  ;;
esac

exit 0

# Usage (may change)
# spm chainInfo → block 0, started on, consensus
# spm nodeInfo → up since, blocks received, last block, date/length
# spm tx → tx received, txs, outputs, fees
# spm stakeState → total value, total stake
# spm rewards → rewards pending, rewards earned
# spm leaderSchedule → schedule, started at, finished at
# spm frag -q (query) <well formed fragment> returns fragment, received, uploaded, status
# spm settings -h (localHost) <set local host>  <blockchain used>