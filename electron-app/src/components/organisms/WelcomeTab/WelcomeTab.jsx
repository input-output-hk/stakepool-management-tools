import React, { useState } from 'react';
import { menuItems } from '../../../content/content';
import WelcomeGuide from '../../molecules/WelcomeGuide/WelcomeGuide';
import InputContainer from '../../molecules/InputContainer/InputContainer';
import { getMessage } from '../../../utils/messages';
import ModalData from '../../molecules/ModalData/ModalData';

const WelcomeTab = () => {
  const [visible, setVisible] = useState(false);
  const [modalTopic, setModalTopic] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [modalContent, setModalContent] = useState();

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const loadModal = ({ title, content, topic }) => {
    setModalTitle(title);
    setModalContent(content);
    setModalTopic(topic);
    showModal();
  };

  // may have to move this to Home component
  const loadNodeAddress = nodeAddress => {
    console.log(nodeAddress);
  };
  const handleCheck = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  // TODO: UI - change div to button and apply styles
  const renderGetStartedMenu = () =>
    menuItems.map(item => (
      <div className="box" onClick={() => loadModal(item)} key={item.option}>
        <p>{item.topic}</p>
      </div>
    ));

  return (
    <div className="containerTab">
      <div className="rightColumn">
        <WelcomeGuide onCheck={handleCheck} />
      </div>
      <div className="leftColumn">
        <h2>{getMessage('welcome.getStarted.title')}</h2>
        {renderGetStartedMenu()}
        <ModalData
          visible={visible}
          onCancel={hideModal}
          onOk={hideModal}
          title={modalTitle}
          content={modalContent}
          topic={modalTopic}
        />
        <InputContainer
          description={getMessage('welcome.nodeInput.description')}
          placeholder={getMessage('welcome.nodeInput.placeholder')}
          buttonText={getMessage('welcome.nodeInput.button')}
          onClick={loadNodeAddress}
        />
      </div>
    </div>
  );
};

export default WelcomeTab;
