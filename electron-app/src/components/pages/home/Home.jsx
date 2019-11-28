import React, { useState } from 'react';
import { Tabs, message } from 'antd';
import WelcomeTab from '../../organisms/WelcomeTab/WelcomeTab';
import ReportTab from '../../organisms/ReportTab/ReportTab';
import './_style.scss';
import '../../../css/app.scss';
import { getMessage } from '../../../utils/messages';
import { checkConnection } from '../../../utils/api';

const Home = () => {
  const { TabPane } = Tabs;

  const [nodeAddress, setNodeAddress] = useState();
  const [activeTab, setActiveTab] = useState('1');

  const verifyConnection = async address => {
    if (address === '') {
      setNodeAddress();
      return;
    }
    const connected = await checkConnection(address);
    if (connected) {
      setNodeAddress(address);
      setActiveTab('2');
      message.success(getMessage('welcome.nodeInput.alerts.success'), 1);
    } else {
      setNodeAddress();
      message.error(getMessage('welcome.nodeInput.alerts.error'), 1);
    }
  };

  const handleChangeTab = clickedTab => {
    setActiveTab(clickedTab);
  };

  return (
    <div className="ContainerApp">
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onTabClick={handleChangeTab}
      >
        <TabPane tab={getMessage('tabs.welcome')} key="1">
          <WelcomeTab connectNode={verifyConnection} />
        </TabPane>
        <TabPane tab={getMessage('tabs.report')} key="2">
          <ReportTab nodeAddress={nodeAddress} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
