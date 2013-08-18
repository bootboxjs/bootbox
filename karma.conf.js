module.exports = function(config) {

  return config.set({
    basePath: '',
    frameworks: ["mocha"],
    files: [
      "node_modules/chai/chai.js",
      "tests/vendor/jquery-1.8.3.min.js",
      "tests/vendor/bootstrap-3.0.0-wip.js",
      // awkward name; we mean the bootstrap process, not the library!
      "tests/bootstrap.js",
      "bootbox.js",
      "tests/**/*.test.js"
    ],
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
