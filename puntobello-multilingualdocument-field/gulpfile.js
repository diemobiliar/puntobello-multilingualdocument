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

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-newsFeed-itemCell' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Fabric' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'is-focusVisible' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-newsFeed-itemImage' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-newsFeed-itemContent' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-newsFeed-itemName' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-newsFeed-itemIndex' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-newsFeed-chevron' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-notificationCallout-callout' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-notificationCallout-inner' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class 'ms-notificationCallout-subText' is not camelCase and will not be type-safe.`);

