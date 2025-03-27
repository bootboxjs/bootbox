const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

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
      reporters: ['dots', 'coverage', 'junit', 'progress', 'html'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['ChromeHeadless'],
      captureTimeout: 60000,
      singleRun: true,

      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox']
        }
      },

      coverageReporter: {
        type: 'html',
        dir: 'tests/coverage'
      },

      junitReporter: {
        outputDir: 'tests/reports'
      },

      htmlReporter: {
        outputFile: 'tests/unit-test-reports/units.html',
        
        // Optional
        pageTitle: 'Bootbox',
        subPageTitle: 'Unit test results, Grouped',
        groupSuites: true,
        useCompactStyle: true,
        useLegacyStyle: false,
        showOnlyFailed: false
      }
    });
  };
};