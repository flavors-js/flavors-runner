'use strict';

module.exports = options => (plugin, rawPlugin) => ({
  config: require('./configLoader')(options, typeof rawPlugin === 'object' ? rawPlugin.options : undefined)
});
