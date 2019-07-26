<div align="center">
  <a href="https://github.com/flavors-js/flavors-runner">
    <img width="200" height="200" src="https://flavors-js.github.io/flavors/logo.svg">
  </a>
  <br>
  <br>

[![npm](https://img.shields.io/npm/v/flavors-runner.svg)](https://www.npmjs.com/package/flavors-runner)
[![Build Status](https://travis-ci.org/flavors-js/flavors-runner.svg?branch=master)](https://travis-ci.org/flavors-js/flavors-runner)
[![David](https://img.shields.io/david/flavors-js/flavors-runner.svg)](https://david-dm.org/flavors-js/flavors-runner)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Join the chat at https://gitter.im/flavors-js/flavors](https://badges.gitter.im/flavors-js/flavors.svg)](https://gitter.im/flavors-js/flavors?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
</div>

**This module is deprecated. It was embedded in [flavors](https://github.com/flavors-js/flavors). See [flavors command runner](https://github.com/flavors-js/flavors#command-runner).**

# flavors-runner

Command runner powered by [Flavors](https://github.com/flavors-js/flavors) configuration management library.<br>
It allows to run commands in the pre-configured environment.

## Install

```text
$ npm install --save-dev flavors-runner
```

## Usage

```javascript
const runner = require('flavors-runner');
runner(command, configName, options);
```

```bash
$ FLAVORS_CONFIG_NAME=release-beta npx flavors-runner echo $app_version  
```

## Parameters

### `command` parameter

Can be a one of the following types:

1. string: shell command, executable name or its path;

```javascript
runner('echo $value', configName, options);
runner('/path/to/your/executable', configName, options);
```

2. non-empty string array containing shell command, executable name or its path as first elements and its arguments as other elements;

```javascript
runner(['echo', '$value'], configName, options);
```

3. structure with the following fields:
  - `command`: required, see 1;
  - `args`: optional arguments;

```javascript
runner({command: 'echo', args: ['Hello, ', '$value', '!'] }, configName, options);
```

4. function receiving flavors configuration and returning value of the one of listed above types or `undefined` (i.e. without `return` statement);

```javascript
runner(config => ['echo', config.value], configName, options);

runner(config => ({ command: 'echo', args: ['Hello, ', config.value, '!'] }), configName, options);

runner(config => { console.log(config.value); }, configName, options);
```

5. plugin structure:
  - `command`: see 4;
  - `options` - plugin specific flavors options, which is merged with [`options` parameter](#options-parameter);

*example/config.js*:
```javascript
module.exports = {
  value: 'world'
};
```

*echoPlugin.js*:
```javascript
module.exports = {
  command: config => ['echo', 'Hello, ' + config.value],
  options: {
    transform: config => {
      config.value += '!';
      return config;
    }
  }
};
```

```javascript
runner(require('./echoPlugin'), 'example', options);

// prints "Hello, world!"
```

6. structure with the following fields:
  - `plugin`: see 5;
  - `args`: array with additional plugin arguments or function receiving flavors configuration and returning this array;
        
```javascript
runner({plugin: require('./echoPlugin'), args: config => [' And goodbye, ' + config.value]}, 'example', options);

// prints "Hello, world! And goodbye, world!"
``` 

### `configName` parameter

[Flavors configuration name](https://github.com/flavors-js/flavors#configname-parameter).

### `options` parameter

Contains the same fields as [flavors `options` parameter](https://github.com/flavors-js/flavors#options-parameter) with following additional parameters:

#### `command` options

When command resolved to executable name and its arguments runner will try to resolve it to command defined in flavors configuration.
This command must be a string or a function, that accepts arguments, loaded flavors configuration and `runner` function that allows to run subsequent commands.

*commandTest/config.js*:
```javascript
module.exports = {
  value: 'Hello, world!',
  command: {
    echo: args => {
      console.log('custom echo: ' + args.join(' '));
    },
    dockerCompose: {
      test: (args, config) => console.log(config.value)
    },
    // "command.enabled" option is set to false to avoid calling this "ls" command recursively and call system "ls" executable
    ls: (args, config, runner) => runner(['ls', ...args], {command: {enabled: false}})
  }
};
```

```javascript
runner(['echo', 'a', 'b', 'c'], 'commandTest');
// prints "custom echo: a b c"

runner(['dockerCompose', 'test'], 'commandTest');
// prints "Hello, world!"

runner(['ls', '.'], 'commandTest');
//prints current directory content
```

#### `command.property` option

Default is `command`. Runner will search commands in flavors configuration under the property name specified in this option.

#### `command.enabled` option

Default is `true`.
Set to `false` to disable command resolving from flavors configuration.




#### `spawn` option

##### `spawn.options` option

Options passed to `child_process.spawnSync()` or `child_process.spawn()` method (see `spawn.sync` [option](#spawn.async-option)).
For example, use `{ shell: true }` to execute command inside shell to enable variable expansion:

```javascript
runner('echo $someValue', configName, {shell: true});
```

##### `spawn.async` option

Set this options to `true` to use [`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) to run command asynchronously.
By default [`child.process.spawnSync()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options) is used.

### Returned value

Returns result of `child_process.spawn()` or `child_process.spawnSync()` call (see `sync` [option](#spawn.async-option)).

## Maintainers

- [@mxl](https://github.com/mxl)

## License

See the [LICENSE](https://github.com/flavors-js/flavors-runner/blob/master/LICENSE) file for details.
