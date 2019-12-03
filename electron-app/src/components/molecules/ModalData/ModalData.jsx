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
    <ResizableBox height={300} minConstraints={[200, 200]}>
      <div className="resizable-content">
        {title && <h2 className="TitleModal">{title}</h2>}
        <div>{content}</div>
      </div>
    </ResizableBox>
  </Modal>
);

ModalData.defaultProps = {
  visible: false,
  title: undefined
};

ModalData.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.element.isRequired,
  topic: PropTypes.string.isRequired
};

export default ModalData;
