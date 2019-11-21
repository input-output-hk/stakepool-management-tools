import UnderstandRequirement from './modals/UnderstandRequirements';
import InstallNode from './modals/InstallNode';
import ConfigureNode from './modals/ConfigureNode';
import FundAccount from './modals/FundAccount';
import TestStake from './modals/TestStake';

export const menuItems = [
  {
    option: 1,
    topic: '1. Understand Stake Pool Minimum Requirements',
    title: '',
    content: UnderstandRequirement
  },
  {
    option: 2,
    topic: '2. Install Node and Command Line Tool (CLI)',
    title: '',
    content: InstallNode
  },
  {
    option: 3,
    topic: '3. Configure Node',
    title: '',
    content: ConfigureNode
  },
  {
    option: 4,
    topic: '4. Setup Account',
    title: '',
    content: '4 test content'
  },
  {
    option: 5,
    topic: '5. Fund Account + Create Transaction',
    title: '',
    content: FundAccount
  },
  {
    option: 6,
    topic: '6. Test Stake Pool',
    title: '',
    content: TestStake
  },
  {
    option: 7,
    topic: '7. View Reporting',
    title: 'View Reporting',
    content: '7 test content'
  }
];
