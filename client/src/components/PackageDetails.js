import React from 'react';
import { Link } from 'react-router-dom';

const PackageDetails = ({ name, details }) => {
  const dependencies = () => {
    if (details[1].dependencies.length !== 0) {
      return (
        <ul>
          {details[1].dependencies.map((d) => (
            <li key={d.main}>
              <Link to={`/${d.main}`}>{d.main}</Link>{' '}
            </li>
          ))}
        </ul>
      );
    }
    return <div style={{ marginLeft: '2rem' }}>No dependencies!</div>;
  };

  const dependentPackages = () => {
    if (details[1].dependentPackages.length !== 0) {
      return (
        <ul>
          {details[1].dependentPackages.map((d) => (
            <li key={d}>
              <Link to={`/${d}`}>{d}</Link>{' '}
            </li>
          ))}
        </ul>
      );
    }
    return <div style={{ marginLeft: '2rem' }}>No dependent packages!</div>;
  };
  return (
    <div>
      <h2>{name}</h2>
      {details[1].description}
      <h4>Dependencies:</h4>
      {dependencies()}
      <h4>Dependent packages:</h4>
      {dependentPackages()}
      <div style={{ marginTop: '3rem' }}>
        <Link to='/'>BACK TO INDEX</Link>
      </div>
    </div>
  );
};

export default PackageDetails;
