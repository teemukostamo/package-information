import React from 'react';

import PackageList from './PackageList';

const Home = ({ pkgArray }) => {
  console.log(pkgArray);
  return (
    <div>
      <h2>Package information</h2>

      {pkgArray.map((pkg) => (
        <PackageList key={pkg[0]} name={pkg[0]} details={pkg[1]} />
      ))}
    </div>
  );
};

export default Home;
