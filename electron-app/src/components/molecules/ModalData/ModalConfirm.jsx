import propTypes from 'prop-types';
import { Modal } from 'antd';

const ModalConfirm = ({ title, onOk, okText, cancelText, content }) =>
  Modal.confirm({
    title,
    onOk,
    okText,
    cancelText,
    content,
    icon: 'exclamation-circle',
    maskClosable: true,
    className: ''
  });

ModalConfirm.defaultProps = {
  onOk: undefined,
  okText: 'Ok',
  cancelText: 'Cancel',
  content: undefined
};

ModalConfirm.PropTypes = {
  title: propTypes.string.isRequired,
  onOk: propTypes.func,
  okText: propTypes.string,
  cancelText: propTypes.string,
  content: propTypes.node
};

export default ModalConfirm;
