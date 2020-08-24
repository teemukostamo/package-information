import React from 'react';
import { Link } from 'react-router-dom';

const PackageDetails = ({ name, details }) => {
  console.log(details);
  const dependencies = () => {
    if (details[1].dependencies.length !== 0) {
      return details[1].dependencies.map((d) => (
        <div key={d.main}>
          <Link to={`/${d.main}`}>{d.main}</Link>{' '}
        </div>
      ));
    }
    return <div>no dependencies</div>;
  };

  const dependentPackages = () => {
    if (details[1].dependentPackages.length !== 0) {
      return details[1].dependentPackages.map((d) => (
        <div key={d}>
          <Link to={`/${d}`}>{d}</Link>{' '}
        </div>
      ));
    }
    return <div>no dependent packages</div>;
  };
  return (
    <div>
      <h2>{name}</h2>
      {details[1].description}
      <h4>dependencies</h4>
      {dependencies()}
      <h4>dependent packages</h4>
      {dependentPackages()}
      <div>
        <Link to='/'>home</Link>
      </div>
    </div>
  );
};

export default PackageDetails;
