import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';

const TitlePrimary = ({ textSmallTitle, title, theme }) => {
  const classname = 'TitlePrimary ' + theme;
  return (
    <div className={classname}>
      <p className="smallTitle">{textSmallTitle}</p>
      <h2>{title}</h2>
    </div>
  );
};

TitlePrimary.propTypes = {
  textSmallTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  theme: PropTypes.string
};

TitlePrimary.defaultProps = {
  textSmallTitle: undefined,
  theme: undefined
};

export default TitlePrimary;
