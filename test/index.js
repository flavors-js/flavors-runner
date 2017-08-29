'use strict';

const
  assert = require('assert'),
  path = require('path');

function testPath(...names) {
  return path.resolve(__dirname, ...names);
}

function options(options) {
  return Object.assign({ sync: true, spawnOptions: { shell: true } }, options);
}

const
  commonTestPath = testPath('commonTest'),
  runner = require('../index.js');

describe('runner', () => {
  it('initializes environment', () => {
    assert.equal(runner(options({
      command: 'echo $value',
      configName: 'a',
      workingDir: commonTestPath
    })).stdout.toString(), '1\n');
  });
  it('skips environment initialization', () => {
    assert.equal(runner(options({
      command: 'echo $value',
      configName: 'a',
      skipEnv: true,
      workingDir: commonTestPath
    })).stdout.toString(), '\n');
  });
  it('flattens config', () => {
    assert.equal(runner(options({
      command: 'echo $nested_value',
      configName: 'a',
      workingDir: testPath('nested')
    })).stdout.toString(), '1\n');
  });
  it('applies transform', () => {
    assert.equal(runner(options({
      args: ['$value', '$value'],
      command: 'echo $value',
      configName: 'a',
      transform: require(testPath('transform', 'index.js')),
      workingDir: commonTestPath
    })).stdout.toString(), '2 2 2\n');
  });
  it('applies configDirName', () => {
    assert.equal(runner(options({
      command: 'echo $value',
      configName: 'a',
      configDirName: 'config',
      workingDir: testPath('configDirName')
    })).stdout.toString(), '1\n');
  });
  it('applies configFileName', () => {
    assert.equal(runner(options({
      command: 'echo $value',
      configFileName: 'custom',
      configName: 'a',
      workingDir: testPath('configFileName')
    })).stdout.toString(), '1\n');
  });
  it('applies loaders', () => {
    assert.equal(runner(options({
      command: 'echo $value1$value2$value3',
      configName: 'a-b-c',
      loaders: [require(testPath('..', 'node_modules', 'flavors', 'jsonLoader.js')), require('flavors/jsLoader'), require('flavors-loader-yaml')],
      workingDir: testPath('loaders')
    })).stdout.toString(), '123\n');
  });
  describe('runs Node.js module', () => {
    it('with string', () => {
      assert.equal(runner(options({
        args: ['$value', '$value'],
        command: testPath('module', 'string.js'),
        configName: 'a',
        module: true,
        workingDir: testPath('module')
      })).stdout.toString(), '1 1 1\n');
    });
    it('with function returning string', () => {
      assert.equal(runner(options({
        args: ['$value', '$value'],
        command: testPath('module', 'functionString.js'),
        configName: 'a',
        module: true,
        workingDir: testPath('module')
      })).stdout.toString(), '1 1 1\n');
    });
    it('with function returning child_process.spawn() args', () => {
      assert.equal(runner(options({
        args: ['$value', '$value'],
        command: testPath('module', 'spawnArgs.js'),
        configName: 'a',
        module: true,
        workingDir: testPath('module')
      })).stdout.toString(), '1 1 1\n');
    });
    it('with object', () => {
      assert.equal(runner(options({
        args: ['$value', '$value'],
        command: testPath('module', 'object.js'),
        configName: 'a',
        module: true,
        workingDir: testPath('module')
      })).stdout.toString(), '2 2 2\n');
    });
  });
});