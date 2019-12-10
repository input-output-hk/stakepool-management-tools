import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { getMessage } from '../../../utils/messages';
import './_style.scss';

const StatusMessage = ({ text, status }) => {
  const shouldSpin = status === 'loading';
  const iconType = status === 'loading' ? 'loading' : 'exclamation-circle';
  const message = text || getMessage(`api.status.${status}`);
  return (
    <div className="StatusIcon">
      <Icon type={iconType} spin={shouldSpin} />
      <p>{message}</p>
    </div>
  );
};

StatusMessage.defaultProps = {
  text: undefined,
  status: 'noInfo'
};

StatusMessage.propTypes = {
  text: PropTypes.string,
  status: PropTypes.oneOf(['loading', 'noInfo'])
};

export default StatusMessage;
