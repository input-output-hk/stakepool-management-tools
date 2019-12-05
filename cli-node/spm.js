#!/usr/bin/env node

const { showHelp, showInfoContent } = require('./lib/helpers');
const { connectToNode } = require('./lib/interface');

const [, , ...args] = process.argv;

const start = () => {
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    showHelp();
    return 0;
  }

  if (args.length === 1 && (args[0] === '--info' || args[0] === '-i')) {
    showInfoContent();
    return 0;
  }
  if (args.length === 3 && args[0] === 'settings' && args[1] === '-p') {
    connectToNode(args[2]);
  } else {
    console.log('Wrong arguments provided. Run `spm --help` for usage details');
    return 1;
  }
};

start();
