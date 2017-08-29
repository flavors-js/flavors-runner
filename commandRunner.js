'use strict';

module.exports = (spawnArgs, options, config) => {
  const child = require('child_process');
  return (options.sync ? child.spawnSync : child.spawn)(
    spawnArgs.command,
    [...(spawnArgs.args || []), ...(options.args || [])],
    require('./processOptions')(config, options, spawnArgs.options));
};
