'use strict';

module.exports = (config, options, commandSpawnOptions) => {
  commandSpawnOptions = commandSpawnOptions || {};
  const extraSpawnOptions = options.spawnOptions || {};
  return Object.assign({}, commandSpawnOptions, extraSpawnOptions, {
    cwd: (options.skipCwd ? undefined : options.workingDir) || extraSpawnOptions.cwd || commandSpawnOptions.cwd || process.cwd(),
    env: Object.assign({}, process.env, options.skipEnv ? {} : require('flat').flatten(config, { delimiter: '_' }), commandSpawnOptions.env, extraSpawnOptions.env)
  });
};
