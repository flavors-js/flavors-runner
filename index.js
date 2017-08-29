'use strict';

module.exports = options => {
  return require('./pluginRunner')(
    options.module
      ? require('./pluginLoader')(options.command, options)
      : { command: options.command, config: require('./configLoader')(options) },
    options);
};
