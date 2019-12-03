import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ResizableBox } from 'react-resizable';
import './_style.scss';

const ModalData = ({ visible, onOk, title, content, topic, onCancel }) => (
  <Modal
    title={topic}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    maskClosable
    cancelButtonProps={{ style: { display: 'none' } }}
  >
    <ResizableBox
      //width={300}
      height={200}
      //minConstraints={[100, 100]}
      //maxConstraints={[900, 900]}
    >
      <div className="resizable-content">
        <h2 className="TitleModal">{title}</h2>
        <p>{content}</p>
      </div>
    </ResizableBox>
  </Modal>
);

ModalData.defaultProps = {
  visible: false
};

ModalData.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired, // may change
  topic: PropTypes.string.isRequired
};

export default ModalData;
