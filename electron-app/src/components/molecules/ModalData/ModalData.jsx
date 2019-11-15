import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import './_style.scss';

const ModalData = ({ visible, onOk, onCancel, title, content, topic }) => (
  <Modal title={topic} visible={visible} onOk={onOk} onCancel={onCancel}>
    <h2 className="TitleModal">{title}</h2>
    <p>{content}</p>
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
