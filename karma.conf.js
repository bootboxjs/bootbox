module.exports = function(config) {

  return config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: ['node_modules/chai/chai.js', 'public/vendor/angular.js/build/angular.js', 'public/vendor/angular.js/build/angular-mocks.js', 'lib/client/modules.coffee', 'lib/client/**/*.coffee', 'test/bootstrap.coffee', 'test/**/*.test.coffee'],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["PhantomJS"],
    captureTimeout: 60000,
    singleRun: false
  });

};
