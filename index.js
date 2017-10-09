'use strict';

module.exports = options => require('./pluginRunner')(require('./pluginLoader')(options), options);
