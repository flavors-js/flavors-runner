'use strict';

module.exports = options =>
  require('flavors-plugin-loader')(
    typeof options.command === 'object' ? options.command : { command: options.command },
    [require('flavors-plugin-loader-config')(options), require('flavors-plugin-loader-command')]);
