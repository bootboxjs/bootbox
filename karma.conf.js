module.exports = function(config) {

  return config.set({
    basePath: "",
    frameworks: ["mocha", "chai"],
    files: [
      "tests/vendor/jquery-1.8.3.min.js",
      "tests/vendor/bootstrap-3.0.0-wip.js",
      "bootbox.js",
      "tests/**/*.test.coffee",
      "tests/**/*.test.js"
    ],
    exclude: [],
    preprocessors: {
      "**/*.coffee": ["coffee"],
      "bootbox.js": ["coverage"]
    },
    reporters: ["dots", "coverage", "junit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["PhantomJS"],
    captureTimeout: 60000,
    singleRun: false,

    coverageReporter: {
      type: "cobertura",
      dir: "tests/coverage"
    },

    junitReporter: {
      outputFile: "tests/reports/results.xml"
    }
  });

};
