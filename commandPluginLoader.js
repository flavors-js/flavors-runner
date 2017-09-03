'use strict';

module.exports = () => (plugin, rawPlugin) => {
  let command;
  if (typeof rawPlugin === 'object') {
    command = rawPlugin.command;
  } else {
    command = rawPlugin;
  }
  if (typeof command === 'function') {
    command = command(plugin.config);
  }
  return {
    command: command
  };
};
