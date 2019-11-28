module.exports = function(params) {
  'use strict';
  return function(config) {

    return config.set({
      basePath: '',
      frameworks: ['mocha', 'sinon-chai'],
      files: Array.prototype.concat(
        params.vendor,

        params.src || 'bootbox.js',

        ['tests/**/*.test.js']
      ),
      exclude: [],
      reporters: ['dots', 'coverage', 'junit'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['PhantomJS'],
      captureTimeout: 60000,
      singleRun: true,

      coverageReporter: {
        type: 'html',
        dir: 'tests/coverage'
      },

      junitReporter: {
        outputDir: 'tests/reports'
      }
    });

  };

};
