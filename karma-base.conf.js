module.exports = function(params) {

  "use strict";

  console.log("Vendor files: " + params.vendor.join(", "));

  return function(config) {

    return config.set({
      basePath: "",
      frameworks: ["mocha", "chai"],
      files: Array.prototype.concat([
        "node_modules/sinon/lib/sinon.js",
        "node_modules/sinon/lib/sinon/spy.js",
        "node_modules/sinon/lib/sinon/stub.js",
        "node_modules/sinon-chai/lib/sinon-chai.js"],

        params.vendor,

        params.src || "bootbox.js",

        ["tests/**/*.test.js"]
      ),
      exclude: [],
      preprocessors: {
        "bootbox.js": ["coverage"]
      },
      reporters: ["dots", "coverage", "junit"],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ["PhantomJS"],
      captureTimeout: 60000,
      singleRun: true,

      coverageReporter: {
        type: "html",
        dir: "tests/coverage"
      },

      junitReporter: {
        outputDir: "tests/reports"
      }
    });

  };

};
