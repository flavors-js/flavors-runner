'use strict';

module.exports = (plugin, options) => {
  const command = plugin.command;
  if (typeof command === 'object') {
    return require('./commandRunner')(command, options, plugin.config);
  } else if (typeof command === 'function') {
    return command(options);
  } else {
    return require('./commandRunner')({ command: command }, options, plugin.config);
  }
};
