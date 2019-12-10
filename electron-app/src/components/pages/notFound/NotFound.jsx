import React, { useEffect } from 'react';
import { PagesNames, documentName } from '../../../utils/constants';
import './_style.scss';

const NotFound = () => {
  useEffect(() => {
    document.title = `${PagesNames.NotFound} | ${documentName}`;
  });

  return (
    <div className="container404">
      <div className="imageSection">
        <img src="img/404.png" alt="" />
      </div>
      <h1>ERROR 404: Page Not Found!</h1>
    </div>
  );
};

export default NotFound;
