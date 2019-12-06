const path = require('path');

exports.infoSections = {
  1: {
    topic: '1. Understand Stake Pool Minimum Requirements',
    content: path.join(__dirname, '../content/understandRequirements.md')
  },
  2: {
    topic: '2. Install Node and Command Line Tool (CLI)',
    content: path.join(__dirname, '../content/installNode.md')
  },
  3: {
    topic: '3. Configure Node',
    content: path.join(__dirname, '../content/configureNode.md')
  },
  4: {
    topic: '4. Create and Send Certificate',
    content: path.join(__dirname, '../content/createCertificate.md')
  },
  5: {
    topic: '5. Test Stake Pool',
    content: path.join(__dirname, '../content/testStake.md')
  }
};
