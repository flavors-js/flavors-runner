'use strict';

const
  modulePrefix = 'flavored-';

module.exports = (rawPlugin, loaders) => {
  if (typeof rawPlugin === 'string') {
    try {
      rawPlugin = require(modulePrefix + rawPlugin);
    } catch (ignore) {
      rawPlugin = require(rawPlugin);
    }
  }
  let plugin = {};
  for (let loader of loaders) {
    plugin = Object.assign(plugin, loader(plugin, rawPlugin));
  }
  return plugin;
};
