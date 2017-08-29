'use strict';

const removeEmpty = require('./util').removeEmpty;

module.exports = (options, moduleOptions) => {
  moduleOptions = moduleOptions || {};
  let loaders = options.loaders;
  if (!options.overrideLoaders && moduleOptions.loaders) {
    loaders = [...moduleOptions.loaders, ...(loaders || [])];
  }

  let transform = options.transform;
  if (!options.overrideTransform && moduleOptions.transform) {
    if (transform) {
      const transform2 = transform, transform1 = moduleOptions.transform;
      transform = (config, info) => {
        transform2(transform1(config, info), info);
      };
    } else {
      transform = moduleOptions.transform;
    }
  }

  return require('flavors')(options.configName, Object.assign(moduleOptions, removeEmpty({
    configDirName: options.configDirName,
    configFileName: options.configFileName,
    configNameSeparator: options.configNameSeparator,
    workingDir: options.workingDir,
    loaders: loaders,
    transform: transform
  })));
};