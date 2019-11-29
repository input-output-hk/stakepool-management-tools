import UnderstandRequirement from './modals/UnderstandRequirements';
import InstallNode from './modals/InstallNode';
import ConfigureNode from './modals/ConfigureNode';
import TestStake from './modals/TestStake';
import CreateCertificate from './modals/CreateCertificate';

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
    topic: '4. Create and Send Certificate',
    title: '',
    content: CreateCertificate
  },
  {
    option: 5,
    topic: '5. Test Stake Pool',
    title: '',
    content: TestStake
  }
];
