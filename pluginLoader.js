'use strict';

const
  modulePrefix = 'flavored-';

module.exports = (rawPlugin, options) => {
  if (typeof rawPlugin === 'string') {
    try {
      rawPlugin = require(modulePrefix + rawPlugin);
    } catch (ignore) {
      rawPlugin = require(rawPlugin);
    }
  }

  let flavorsOptions, command;
  if (typeof rawPlugin === 'object') {
    flavorsOptions = rawPlugin.options;
    command = rawPlugin.command;
  } else {
    command = rawPlugin;
  }
  const config = require('./configLoader')(options, flavorsOptions);
  if (typeof command === 'function') {
    command = command(config);
  }
  return {
    command: command,
    config: config
  };
};
