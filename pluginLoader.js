'use strict';

module.exports = options =>
  require('flavors-plugin-loader')(options.command, [
    require('flavors-plugin-loader-config')(options),
    require('flavors-plugin-loader-command')
  ]);
