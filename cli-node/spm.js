#!/usr/bin/env node

const [, , ...args] = process.argv;

const {
  showHelp,
  showInfoContent,
  showInfoSections
} = require('./lib/helpers');
const { connectToNode } = require('./lib/interface');

const { infoSections } = require('./lib/content');

const start = () => {
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    showHelp();
    return 0;
  }

  if (args.length === 1 && (args[0] === '--info' || args[0] === '-i')) {
    showInfoSections();
    return 0;
  }

  if (args.length === 2 && (args[0] === '--info' || args[0] === '-i')) {
    if (Object.keys(infoSections).includes(args[1])) {
      showInfoContent(args[1]);
      return 0;
    } else {
      console.log(
        `'${
          args[1]
        }' is not a valid section value. Run \`spm --info\` to list all available sections.`
      );
      return 1;
    }
  }

  if (args.length === 3 && args[0] === 'settings' && args[1] === '-p') {
    connectToNode(args[2]);
  } else {
    console.log('Wrong arguments provided. Run `spm --help` for usage details');
    return 1;
  }
};

start();
