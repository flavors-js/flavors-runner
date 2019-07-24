'use strict';

const
  assert = require('assert'),
  path = require('path'),
  merge = require('deepmerge');

function testPath(...names) {
  return path.resolve(__dirname, ...names);
}

function runnerOutputEqual(options, expected) {
  assert.strictEqual(runner(merge({
    sync: true,
    spawnOptions: {shell: true}
  }, options)).stdout.toString(), expected + '\n');
}

const
  commonTestPath = testPath('commonTest'),
  runner = require('../index.js');

describe('runner', () => {
  it('initializes environment', () => {
    runnerOutputEqual({
      command: 'echo $value',
      configName: 'a',
      workingDir: commonTestPath
    }, '1');
  });
  it('skips environment initialization', () => {
    runnerOutputEqual({
      command: 'echo $value',
      configName: 'a',
      skipEnv: true,
      workingDir: commonTestPath
    }, '');
  });
  it('flattens config', () => {
    runnerOutputEqual({
      command: 'echo $nested_value',
      configName: 'a',
      workingDir: testPath('nested')
    }, '1');
  });
  it('applies transform', () => {
    runnerOutputEqual({
      args: ['$value', '$value'],
      command: 'echo $value',
      configName: 'a',
      transform: require(testPath('transform', 'index.js')),
      workingDir: commonTestPath
    }, '2 2 2');
  });
  it('applies configDirName', () => {
    runnerOutputEqual({
      command: 'echo $value',
      configName: 'a',
      configDirName: 'config',
      workingDir: testPath('configDirName')
    }, '1');
  });
  it('applies configFileName', () => {
    runnerOutputEqual({
      command: 'echo $value',
      configFileName: 'custom',
      configName: 'a',
      workingDir: testPath('configFileName')
    }, '1');
  });
  it('applies loaders', () => {
    runnerOutputEqual({
      command: 'echo $value1$value2$value3',
      configName: 'a-b-c',
      loaders: [require('flavors/jsonLoader'), require('flavors/jsLoader'), require('flavors-loader-yaml')],
      workingDir: testPath('loaders')
    }, '123');
  });
  describe('runs Node.js module', () => {
    it('with string', () => {
      runnerOutputEqual({
        args: ['$value', '$value'],
        command: require(testPath('module', 'string.js')),
        configName: 'a',
        workingDir: testPath('module')
      }, '1 1 1');
    });
    it('with function returning string', () => {
      runnerOutputEqual({
        args: ['$value', '$value'],
        command: require(testPath('module', 'functionString.js')),
        configName: 'a',
        workingDir: testPath('module')
      }, '1 1 1');
    });
    it('with function returning child_process.spawn() args', () => {
      runnerOutputEqual({
        args: ['$value', '$value'],
        command: require(testPath('module', 'spawnArgs.js')),
        configName: 'a',
        workingDir: testPath('module')
      }, '1 1 1');
    });
    it('with object', () => {
      runnerOutputEqual({
        args: ['$value', '$value'],
        command: require(testPath('module', 'object.js')),
        configName: 'a',
        workingDir: testPath('module')
      }, '2 2 2');
    });
  });
});