import React from 'react';
import setTitle from '../utils.jsx';

const PageNotFound = () => {
  setTitle();
  return (
    <div className="d-flex flex-column h-100 justify-content-center align-items-center">
      <h1 className="display-1">404</h1>
    </div>
  );
};

export default PageNotFound;
