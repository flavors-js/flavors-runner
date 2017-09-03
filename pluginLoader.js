'use strict';

module.exports = (rawPlugin, options) =>
  require('./genericPluginLoader')(rawPlugin,
    [require('./configPluginLoader')(options), require('./commandPluginLoader')(options)]);
