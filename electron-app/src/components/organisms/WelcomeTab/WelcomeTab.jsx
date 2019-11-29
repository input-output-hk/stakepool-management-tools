import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { menuItems } from '../../../content/content';
import WelcomeGuide from '../../molecules/WelcomeGuide/WelcomeGuide';
import InputContainer from '../../molecules/InputContainer/InputContainer';
import { getMessage } from '../../../utils/messages';
import ModalData from '../../molecules/ModalData/ModalData';

const WelcomeTab = ({ connectNode }) => {
  const [visible, setVisible] = useState(false);
  const [modalTopic, setModalTopic] = useState();
  const [modalContent, setModalContent] = useState();
  const [addressInput, setAddressInput] = useState();

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleInputChange = ({ target: { value } }) => {
    setAddressInput(value);
  };

  const loadModal = ({ content, topic }) => {
    setModalContent(content);
    setModalTopic(topic);
    showModal();
  };

  const loadNodeAddress = () => {
    connectNode(addressInput);
  };

  const renderGetStartedMenu = () =>
    menuItems.map(item => (
      <div className="box" onClick={() => loadModal(item)} key={item.option}>
        <p>{item.topic}</p>
      </div>
    ));

  return (
    <div className="containerTab">
      <div className="rightColumn">
        <WelcomeGuide />
      </div>
      <div className="leftColumn">
        <h2>{getMessage('welcome.getStarted.title')}</h2>
        {renderGetStartedMenu()}
        <ModalData
          visible={visible}
          onCancel={hideModal}
          onOk={hideModal}
          content={modalContent}
          topic={modalTopic}
        />
        <InputContainer
          description={getMessage('welcome.nodeInput.description')}
          placeholder={getMessage('welcome.nodeInput.placeholder')}
          buttonText={getMessage('welcome.nodeInput.button')}
          onClick={loadNodeAddress}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

WelcomeTab.propTypes = {
  connectNode: PropTypes.func.isRequired
};

export default WelcomeTab;
