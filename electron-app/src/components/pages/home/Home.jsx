import React, { useState, useEffect } from 'react';
import { Tabs, message } from 'antd';
import WelcomeTab from '../../organisms/WelcomeTab/WelcomeTab';
import ReportTab from '../../organisms/ReportTab/ReportTab';
import './_style.scss';
import '../../../css/app.scss';
import { getMessage } from '../../../utils/messages';
import { checkConnection } from '../../../utils/api';
import ModalData from '../../molecules/ModalData/ModalData';
import { tosAgreement } from '../../../content/content';
import { store } from '../../../utils/storage';
import ModalConfirm from '../../molecules/ModalData/ModalConfirm';

const {
  remote: { app }
} = require('electron');

const ACCEPTED_TOS = 'acceptedTos';

const Home = () => {
  const { TabPane } = Tabs;

  const [nodeAddress, setNodeAddress] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [tosVisible, setTosVisible] = useState(false);

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

  const agreeTos = () => {
    store.set(ACCEPTED_TOS, true);
    setTosVisible(false);
  };

  const rejectTos = () =>
    ModalConfirm({
      title: getMessage('tos.popup.title'),
      onOk: app.quit,
      okText: getMessage('tos.popup.quit'),
      cancelText: getMessage('tos.popup.cancel'),
      content: getMessage('tos.popup.content'),
      icon: 'exclamation-circle',
      maskClosable: true
    });

  useEffect(() => {
    if (!store.get(ACCEPTED_TOS)) {
      setTosVisible(true);
    }
  }, []);

  return (
    <div className="ContainerApp">
      {tosVisible ? (
        <ModalData
          visible={tosVisible}
          onCancel={rejectTos}
          onOk={agreeTos}
          content={tosAgreement.content}
          topic={tosAgreement.topic}
          okText={getMessage('tos.modal.accept')}
          cancelText={getMessage('tos.modal.doNotAccept')}
          showCancel
        />
      ) : (
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
      )}
    </div>
  );
};

export default Home;
