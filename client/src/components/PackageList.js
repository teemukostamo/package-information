import React from 'react';
import { Link } from 'react-router-dom';

const PackageList = ({ name, details }) => {
  return (
    <div>
      <h1>
        <Link to={`/${name}`}>{name}</Link>{' '}
      </h1>
    </div>
  );
};

export default PackageList;
