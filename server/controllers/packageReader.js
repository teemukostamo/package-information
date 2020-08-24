const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../middleware/errorResponse');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const getPackageDictionary = async (filePath) => {
  try {
    const content = await readFile(filePath, 'utf8');
    const packages = content
      .split('\n\n')
      .filter((block) => block.trim() !== '')
      .map(parsePackage);

    const packageDictionary = packages.reduce((dictionary, pkg) => {
      return {
        ...dictionary,
        [pkg.name]: pkg,
      };
    }, {});

    // Calculate dependentPackages property
    Object.keys(packageDictionary).forEach((name) => {
      const pkg = packageDictionary[name];
      const flatDependencies = [].concat(
        ...pkg.dependencies.map((dependency) => [
          dependency.main,
          ...dependency.alternatives,
        ])
      );
      flatDependencies.forEach((dependencyName) => {
        if (
          packageDictionary[dependencyName] &&
          !packageDictionary[dependencyName].dependentPackages.includes(name)
        ) {
          packageDictionary[dependencyName].dependentPackages.push(name);
        }
      });
    });

    return packageDictionary;
  } catch (error) {
    console.log(error);
  }
};

const parsePackage = (text, index) => {
  try {
    return {
      name: parseName(text),
      description: parseDescription(text),
      dependencies: parseDependencies(text),
      dependentPackages: [],
    };
  } catch (error) {
    throw new Error(`Failed to parse entry ${index}: ${error.message}`);
  }
};

const parseName = (text) => {
  const matches = text.match(/Package:\s(.+)\n/);
  if (matches && matches[1]) {
    return matches[1];
  }
  throw new Error(`Key "Package" not found`);
};

const parseDescription = (text) => {
  const matches = text.match(/Description:\s(.+\n(\s.+\n)*)/);
  if (matches && matches[1]) {
    return matches[1];
  }
  throw new Error(`Key "Description" not found`);
};

const parseDependencies = (text) => {
  const matches = text.match(/\nDepends:\s(.+)\n/);
  if (!matches || !matches[1]) {
    // No dependencies for this package
    return [];
  }
  const dependenciesLine = matches[1];

  // 'libc6 (>= 2.2.5)' -> 'libc6'
  const parsePackageName = (packageString) => packageString.split(' ').shift();

  /*
   * E.g.
   * 'libc6 (>= 2.2.5), dpkg (>= 1.15.4) | install-info' ->
   * [{ main: 'libc6', alternatives: [] }, { main: 'dpkg', alternatives: ['install-info'] }]
   */
  const dependencies = dependenciesLine.split(', ').map((string) => {
    const packages = string.split(' | ');
    if (!packages || packages.length < 1) {
      throw new Error(`Invalid dependency format (${dependenciesLine})`);
    }
    const dependency = {
      main: parsePackageName(packages.shift()),
      alternatives: packages.map(parsePackageName),
    };
    return dependency;
  });

  // Filter out duplicates comparing by dependency.main
  return dependencies.filter(
    (dependency, index) =>
      dependencies.findIndex(
        (otherDependency) => otherDependency.main === dependency.main
      ) === index
  );
};

module.exports = { getPackageDictionary };
