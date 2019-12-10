import React from 'react';
import PropTypes from 'prop-types';

import './_style.scss';

const miscelaneaTitle = ({ text, theme, iconLeft, iconRight }) => {
  const className = `miscelaneaTitle ${theme}`;
  /* eslint-disable react/button-has-type */
  return (
    <p className={className}>
      {iconLeft} {text} {iconRight}
    </p>
  );
  /* eslint-enable react/button-has-type */
};

miscelaneaTitle.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string
};

miscelaneaTitle.defaultProps = {
  iconLeft: undefined,
  iconRight: undefined,
  theme: undefined
};

export default miscelaneaTitle;
