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

# flavors-runner

Command runner powered by [Flavors](https://github.com/flavors-js/flavors) configuration management library.<br>
It allows to run commands in the pre-configured environment.

## Install

```text
$ npm install --save-dev flavors-runner
```

## Usage

```javascript
require('flavors-runner')(options);
```
### Options

`options` parameter contains the same fields as [flavors `options` parameter](https://github.com/flavors-js/flavors#options-parameter) with following additional parameters:

#### `command` option
Command that `flavors-runner` will run.

#### `skipCwd` option
By default working directory of a process which runs the command is set to value specified in `workingDir` [option](https://github.com/flavors-js/flavors#workingdir-option). To ignore such behavior set this options to `true`.  

#### `skipEnv` option
Set this option to `true` to skip environment initialization using loaded configuration.

#### `sync` option

Set this options to `true` to use [`child_process.spawnSync()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options) to run command.
By default [`child.process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) is used.

### Returned value

`require('flavors-runner')(options)` call returns result of `child_process.spawn()` or `child_process.spawnSync()` call (see `sync` [option](#sync-option)).

## Maintainers

- [@mxl](https://github.com/mxl)

## License

See the [LICENSE](https://github.com/flavors-js/flavors-runner/blob/master/LICENSE) file for details.
