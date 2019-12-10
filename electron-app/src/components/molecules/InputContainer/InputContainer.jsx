import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary';

const InputContainer = ({
  description,
  placeholder,
  buttonText,
  onClick,
  onChange
}) => (
  <div>
    <div className="dataContainer">
      {description && <p>{description}</p>}
      <Input
        placeholder={placeholder}
        onChange={onChange}
        onPressEnter={onClick}
      />
    </div>
    <ButtonPrimary text={buttonText} theme="ThemePrimary" onClick={onClick} />
  </div>
);

InputContainer.defaultProps = {
  description: undefined,
  placeholder: '',
  buttonText: 'OK'
};

InputContainer.propTypes = {
  description: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputContainer;
