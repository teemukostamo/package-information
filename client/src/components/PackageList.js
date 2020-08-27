import React from 'react';
import { Link } from 'react-router-dom';

const PackageList = ({ name }) => {
  return (
    <div>
      <h3>
        <Link to={`/${name}`}>{name}</Link>{' '}
      </h3>
    </div>
  );
};

export default PackageList;
