import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Home from './components/Home';
import PackageDetails from './components/PackageDetails';

const App = () => {
  const [packageInfo, setPackageInfo] = useState(null);

  useEffect(() => {
    const getPackageInfo = async () => {
      try {
        const response = await axios.get('/api/packages');
        setPackageInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPackageInfo();
  }, []);

  console.log(packageInfo);
  console.log(typeof packageInfo);
  if (packageInfo === null) {
    return (
      <div>
        <h2>Package information</h2>
        <div>loading packages</div>
      </div>
    );
  }

  const pkgArray = Object.entries(packageInfo).sort();
  console.log(pkgArray);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          render={() => {
            return <Home pkgArray={pkgArray} />;
          }}
        />
        <Route
          path='/:name'
          render={({ match }) => {
            return (
              <PackageDetails
                name={match.params.name}
                details={pkgArray.find((p) => p[1].name === match.params.name)}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
};

export default App;
