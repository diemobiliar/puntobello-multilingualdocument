'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

const webpack = require("webpack");
const getClientEnvironment = require("./process-env");


build.configureWebpack.mergeConfig({
  additionalConfiguration: cfg => {
    let pluginDefine = null;
    for (var i = 0; i < cfg.plugins.length; i++) {
      var plugin = cfg.plugins[i];
      if (plugin.constructor.name === webpack.DefinePlugin.name) {
        pluginDefine = plugin;
      }
    }
 
    const currentEnv = getClientEnvironment().stringified;
 
    if (pluginDefine) {
      pluginDefine.definitions = { ...pluginDefine.definitions, ...currentEnv };
    } else {
      cfg.plugins.push(new webpack.DefinePlugin());
    }
 
    return cfg;
  }
});


var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};


build.initialize(gulp);

