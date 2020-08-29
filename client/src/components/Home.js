import React from 'react';
import PackageList from './PackageList';

const Home = ({ pkgArray }) => {
  return (
    <div>
      <h1>Package information</h1>
      {pkgArray.map((pkg) => (
        <PackageList key={pkg[0]} name={pkg[0]} details={pkg[1]} />
      ))}
    </div>
  );
};

export default Home;
