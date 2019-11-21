import React, { useState } from 'react';
import { Tabs } from 'antd';
import WelcomeTab from '../../organisms/WelcomeTab/WelcomeTab';
import ReportTab from '../../organisms/ReportTab/ReportTab';
import './_style.scss';
import '../../../css/app.scss';
import { getMessage } from '../../../utils/messages';

const Home = () => {
  const { TabPane } = Tabs;

  const [nodeAddress, setNodeAddress] = useState();

  return (
    <div className="ContainerApp">
      <Tabs defaultActiveKey="1">
        <TabPane tab={getMessage('tabs.welcome')} key="1">
          <WelcomeTab connectNode={setNodeAddress} />
        </TabPane>
        <TabPane tab={getMessage('tabs.report')} key="2">
          <ReportTab nodeAddress={nodeAddress} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
